from models import db, Score

def save_score(name: str, score: int):
    """점수를 DB에 저장"""
    s = Score(name=name, score=score)
    db.session.add(s)
    db.session.commit()


def get_top_scores(limit: int = 20):
    """상위 점수 조회"""
    rows = (
        Score.query
        .order_by(Score.score.desc(), Score.created_at.asc())
        .limit(limit)
        .all()
    )
    return rows
