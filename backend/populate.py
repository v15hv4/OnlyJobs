from datetime import datetime, timedelta
from requests_async import Session
from asyncio import get_event_loop
from random import randint, choice
from json import loads, dumps
from faker import Faker
from sys import exit

host = "http://localhost:5000"
headers = {"Content-Type": "application/json"}

s = Session()
f = Faker()

# control
targets = {
    "jobs": {"endpoint": "/api/jobs/new", "n": 20},
    "languages": {"endpoint": "/api/languages/new", "n": 30},
    "recruiters": {"endpoint": "/api/auth/register", "n": 10},
    "applicants": {"endpoint": "/api/auth/register", "n": 40},
    "applications": {"endpoint": "/api/applications/new", "n": 50},
}


async def populate(endpoint, data):
    r = await s.post(f"{host}{endpoint}", data=data, headers=headers)
    if r.status_code != 200:
        exit(f"FAILED:\n\nendpoint: {endpoint}\n\ndata: {data}\n\nresponse: {r.content}")


async def main():
    print("POPULATING...")

    # populate languages {{{
    print("> languages... ", end="")
    n = targets["languages"]["n"]
    endpoint = targets["languages"]["endpoint"]
    for _ in range(n):
        data = dumps({"name": f.name().split(" ")[0]})
        await populate(endpoint, data)
    # }}}

    # populate recruiters {{{
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
                "role": "recruiter",
            }
        )
        await populate(endpoint, data)
    print("done!")
    # }}}

    # populate applicants {{{
    print("> applicants... ", end="")
    n = targets["applicants"]["n"]
    endpoint = targets["applicants"]["endpoint"]
    languages = loads((await s.get(f"{host}/api/languages")).text)
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
                "role": "applicant",
            }
        )
        await populate(endpoint, data)
    print("done!")
    # }}}

    # populate jobs {{{
    print("> jobs... ", end="")
    n = targets["jobs"]["n"]
    endpoint = targets["jobs"]["endpoint"]
    languages = loads((await s.get(f"{host}/api/languages")).text)
    recruiters = loads((await s.get(f"{host}/api/recruiters")).text)
    for _ in range(n):
        data = dumps(
            {
                "title": f.job(),
                "recruiter": choice(recruiters),
                "max_applications": randint(1, 20),
                "max_positions": randint(1, 10),
                "deadline": (datetime.now() + timedelta(minutes=1)).isoformat(),
                "skillset": list(set([choice(languages)["_id"] for i in range(randint(1, 5))])),
                "type": choice(["full_time", "part_time", "work_from_home"]),
                "duration": randint(0, 6),
                "salary": randint(10000, 80000),
            }
        )
        await populate(endpoint, data)
    print("done!")
    # }}}

    # populate applications {{{
    print("> applications... ", end="")
    n = targets["applications"]["n"]
    endpoint = targets["applications"]["endpoint"]
    applicants = loads((await s.get(f"{host}/api/applicants")).text)
    jobs = loads((await s.get(f"{host}/api/jobs")).text)
    for _ in range(n):
        data = dumps({"applicant": choice(applicants), "job": choice(jobs), "SOP": f.text()})
        await populate(endpoint, data)
    print("done!")
    # }}}

    exit("ALL DONE.")


if __name__ == "__main__":
    loop = get_event_loop()
    loop.run_until_complete(main())
    loop.close()
