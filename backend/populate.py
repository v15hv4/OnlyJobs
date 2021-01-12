from random import randint, choice
from json import loads, dumps
from requests import Session
from faker import Faker
from sys import exit

host = "http://localhost:5000"
headers = {"Content-Type": "application/json"}

s = Session()
f = Faker()

# control
targets = {
    "jobs": {"endpoint": "/api/jobs/new", "n": 0},
    "languages": {"endpoint": "/api/languages/new", "n": 0},
    "recruiters": {"endpoint": "/api/recruiters/new", "n": 0},
    "applicants": {"endpoint": "/api/applicants/new", "n": 0},
    "applications": {"endpoint": "/api/applications/new", "n": 30},
}


def populate(endpoint, data):
    r = s.post(f"{host}{endpoint}", data=data, headers=headers)
    if r.status_code != 200:
        exit(f"FAILED:\n\nendpoint: {endpoint}\n\ndata: {data}\n\nresponse: {r.content}")


print("POPULATING...")

# populate languages
n = targets["languages"]["n"]
endpoint = targets["languages"]["endpoint"]
for _ in range(n):
    data = dumps({"name": f.name().split(" ")[0]})
    populate(endpoint, data)

# populate recruiters
n = targets["recruiters"]["n"]
endpoint = targets["recruiters"]["endpoint"]
for _ in range(n):
    data = dumps(
        {
            "email": f.email(),
            "password": f.pystr(),
            "name": f.name(),
            "contact": f.phone_number(),
            "bio": f.text(),
        }
    )
    populate(endpoint, data)

# populate applicants
n = targets["applicants"]["n"]
endpoint = targets["applicants"]["endpoint"]
languages = loads(s.get(f"{host}/api/languages").text)
for _ in range(n):
    data = dumps(
        {
            "email": f.email(),
            "password": f.pystr(),
            "name": f.name(),
            "education": [
                {
                    "name": f.company(),
                    "start_year": f.year(),
                    "end_year": f.year() if randint(0, 1) == 0 else None,
                }
                for i in range(randint(0, 3))
            ],
            "skills": list(set([choice(languages)["_id"] for i in range(randint(0, 5))])),
            "rating": {"value": randint(0, 5), "amount": randint(1, 10),},
        }
    )
    populate(endpoint, data)

# populate jobs
n = targets["jobs"]["n"]
endpoint = targets["jobs"]["endpoint"]
languages = loads(s.get(f"{host}/api/languages").text)
recruiters = loads(s.get(f"{host}/api/recruiters").text)
for _ in range(n):
    data = dumps(
        {
            "title": f.job(),
            "recruiter": choice(recruiters),
            "max_applications": randint(1, 20),
            "max_positions": randint(1, 10),
            "deadline": f.date_this_year(before_today=False, after_today=True).isoformat(),
            "skillset": list(set([choice(languages)["_id"] for i in range(randint(1, 5))])),
            "type": choice(["full_time", "part_time", "work_from_home"]),
            "duration": randint(0, 6),
            "salary": randint(10000, 80000),
            "rating": {"value": randint(0, 5), "amount": randint(1, 10),},
        }
    )
    populate(endpoint, data)

# populate applications
n = targets["applications"]["n"]
endpoint = targets["applications"]["endpoint"]
applicants = loads(s.get(f"{host}/api/applicants").text)
jobs = loads(s.get(f"{host}/api/jobs").text)
for _ in range(n):
    data = dumps(
        {
            "applicant": applicants[0],
            "job": jobs[0],
            "SOP": f.text(),
            "state": choice(["applied", "shortlisted", "accepted", "rejected", "deleted"]),
        }
    )
    populate(endpoint, data)


exit("DONE.")
