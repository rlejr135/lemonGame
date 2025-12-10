from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db
from score_repo import save_score, get_top_scores

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 현재는 SQLite 사용 → 나중에는 환경변수로 DB URI만 변경하면 됨
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///scores.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# 앱 시작 시 테이블 생성
with app.app_context():
    db.create_all()


# --- API ---
@app.route("/api/submit-score", methods=["POST"])
def submit_score_route():
    data = request.get_json()
    name = data.get("name")
    score = data.get("score")

    if not name or score is None:
        return jsonify({"status": "error", "msg": "name or score missing"}), 400

    save_score(name, int(score))
    return jsonify({"status": "ok"})


@app.route("/api/scores", methods=["GET"])
def get_scores_route():
    rows = get_top_scores(20)

    out = [
        {
            "name": r.name,
            "score": r.score,
            "time": r.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for r in rows
    ]

    return jsonify(out)


@app.route("/users", methods=["GET"])
def getusers():

    out = [
            "name",
            "score",
            "time"
        ]

    return jsonify(out)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
