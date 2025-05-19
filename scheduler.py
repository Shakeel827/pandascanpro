from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()

# Add your jobs here, e.g.
# scheduler.add_job(your_job_function, 'interval', minutes=30)

scheduler.start()
