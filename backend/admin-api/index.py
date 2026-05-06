import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def ok(data):
    return {"statusCode": 200, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, default=str)}

def err(msg, code=400):
    return {"statusCode": code, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}

def handler(event: dict, context) -> dict:
    """Админ API: CRUD для topics, clients, recordings, compilations"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    qs = event.get("queryStringParameters") or {}
    resource = qs.get("resource", "").strip("/")
    path = "/" + resource if resource else "/"
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    # --- TOPICS ---
    if path == "/topics":
        if method == "GET":
            cur.execute("""
                SELECT t.id, t.title, t.created_at,
                    COUNT(r.id) AS recordings_count,
                    EXISTS (SELECT 1 FROM compilations c WHERE c.topic_id = t.id) AS has_compilation
                FROM topics t
                LEFT JOIN recordings r ON r.topic_id = t.id
                GROUP BY t.id ORDER BY t.created_at DESC
            """)
            return ok({"topics": [dict(r) for r in cur.fetchall()]})

        if method == "POST":
            title = body.get("title", "").strip()
            if not title:
                return err("title required")
            cur.execute("INSERT INTO topics (title) VALUES (%s) RETURNING *" % ("'" + title.replace("'", "''") + "'",))
            conn.commit()
            return ok({"topic": dict(cur.fetchone())})

    if path.startswith("/topics/") and method == "DELETE":
        topic_id = path.split("/")[-1]
        cur.execute("UPDATE recordings SET topic_id = recordings.topic_id WHERE topic_id = " + topic_id)
        cur.execute("DELETE FROM compilations WHERE topic_id = " + topic_id)
        cur.execute("DELETE FROM recordings WHERE topic_id = " + topic_id)
        cur.execute("DELETE FROM topics WHERE id = " + topic_id)
        conn.commit()
        return ok({"deleted": True})

    # --- CLIENTS ---
    if path == "/clients":
        if method == "GET":
            cur.execute("""
                SELECT cl.id, cl.name, cl.email, cl.status, cl.invited_at,
                    COUNT(r.id) AS recordings_count
                FROM clients cl
                LEFT JOIN recordings r ON r.client_id = cl.id
                GROUP BY cl.id ORDER BY cl.invited_at DESC
            """)
            return ok({"clients": [dict(r) for r in cur.fetchall()]})

        if method == "POST":
            name = body.get("name", "").strip()
            email = body.get("email", "").strip()
            if not name or not email:
                return err("name and email required")
            import secrets
            token = secrets.token_urlsafe(32)
            cur.execute(
                "INSERT INTO clients (name, email, invite_token) VALUES (%s, %s, %s) RETURNING id, name, email, status, invite_token, invited_at",
                (name, email, token)
            )
            conn.commit()
            row = dict(cur.fetchone())
            invite_link = "https://" + event.get("headers", {}).get("host", "localhost") + "/register?token=" + token
            row["invite_link"] = invite_link
            return ok({"client": row})

    if path.startswith("/clients/") and method == "DELETE":
        client_id = path.split("/")[-1]
        cur.execute("DELETE FROM recordings WHERE client_id = " + client_id)
        cur.execute("DELETE FROM clients WHERE id = " + client_id)
        conn.commit()
        return ok({"deleted": True})

    # --- RECORDINGS ---
    if path == "/recordings":
        if method == "GET":
            cur.execute("""
                SELECT r.id, r.duration, r.file_url, r.created_at,
                    cl.name AS client_name,
                    t.title AS topic
                FROM recordings r
                JOIN clients cl ON cl.id = r.client_id
                JOIN topics t ON t.id = r.topic_id
                ORDER BY r.created_at DESC
            """)
            return ok({"recordings": [dict(r) for r in cur.fetchall()]})

    if path.startswith("/recordings/") and method == "DELETE":
        rec_id = path.split("/")[-1]
        cur.execute("DELETE FROM recordings WHERE id = " + rec_id)
        conn.commit()
        return ok({"deleted": True})

    # --- COMPILATIONS ---
    if path == "/compilations":
        if method == "GET":
            cur.execute("""
                SELECT c.id, c.duration, c.file_url, c.sources_count, c.created_at,
                    t.title AS topic
                FROM compilations c
                JOIN topics t ON t.id = c.topic_id
                ORDER BY c.created_at DESC
            """)
            return ok({"compilations": [dict(r) for r in cur.fetchall()]})

    if path.startswith("/compilations/") and method == "DELETE":
        comp_id = path.split("/")[-1]
        cur.execute("DELETE FROM compilations WHERE id = " + comp_id)
        conn.commit()
        return ok({"deleted": True})

    # --- STATS ---
    if path == "/stats":
        cur.execute("SELECT COUNT(*) AS cnt FROM topics")
        topics_cnt = cur.fetchone()["cnt"]
        cur.execute("SELECT COUNT(*) AS cnt FROM clients")
        clients_cnt = cur.fetchone()["cnt"]
        cur.execute("SELECT COUNT(*) AS cnt FROM recordings")
        recordings_cnt = cur.fetchone()["cnt"]
        cur.execute("SELECT COUNT(*) AS cnt FROM compilations")
        compilations_cnt = cur.fetchone()["cnt"]
        return ok({
            "topics": topics_cnt,
            "clients": clients_cnt,
            "recordings": recordings_cnt,
            "compilations": compilations_cnt,
        })

    return err("not found", 404)