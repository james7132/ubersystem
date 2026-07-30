from datetime import date, timedelta

from uber.models import WatchList, Session
from uber.tasks import celery


__all__ = ['deactivate_expired_watchlist_entries']


@celery.schedule(timedelta(hours=12))
def deactivate_expired_watchlist_entries():
    with Session() as session:
        expired_entries = session.scalars(select(WatchList).filter(WatchList.active == True,  # noqa: E712
                                                          WatchList.expiration != None,
                                                          WatchList.expiration <= date.today())).all()

        expired_count = len(expired_entries)

        for entry in expired_entries:
            entry.active = False
            session.add(entry)

        return f"Deactivated {expired_count} expired watchlist entries."
