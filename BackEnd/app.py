from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# Vue 개발 서버(5173)에서 접근할 수 있게 CORS 허용
CORS(app)


SCORES = []  # 간단히 메모리에 저장 (토이용)

@app.route("/api/submit-score", methods=["POST"])
def submit_score():
    data = request.get_json()
    name = data.get("name")
    score = data.get("score")

    SCORES.append({
        "name": name,
        "score": score,
        "time": datetime.now().isoformat(timespec="seconds")
    })
    print("NEW SCORE:", SCORES[-1])

    return jsonify({"status": "ok"})
    

# 테스트용 간단한 조회 API
@app.route("/api/scores")
def get_scores():
    # 점수 높은 순 정렬해서 상위 10개만
    top = sorted(SCORES, key=lambda x: x["score"], reverse=True)[:10]
    return jsonify(top)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
