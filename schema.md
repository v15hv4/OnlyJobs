# language
- name (`string`), NOT NULL, RE [<language_regex>]

# user
- uuid (`id`), NOT NULL, UNIQUE
- password (`string`), NOT NULL, HASHED
- role (`string`), NOT NULL, IN [job applicant / recruiter]
- details (`ref`), NOT NULL, IN [@applicant-details / @recruiter-details]

# applicant-details
- name (`string`), NOT NULL, RE [<name_regex>]
- email (`email`), NOT NULL, RE [<email_regex>]
- education (`object list`), NOT NULL, :
    - name (`string`), NOT NULL, RE [<name_regex>]
    - start-year (`int`), NOT NULL, POSITIVE
    - end-year (`int`), POSITIVE
- skills (`list`)
    - @language
- rating (`float`), NOT NULL, POSITIVE
- resume (`file`), IN [.pdf]
- img (`file`), IN [.png / .jpg]

# recruiter-details
- contact (`int`), NOT NULL, POSITIVE
- bio (`text`), MAX 250 words

# job
- title (`string`), NOT NULL, RE [<name_regex>]
- recruiter (`ref`), NOT NULL, @user
- max-applications (`int`), NOT NULL, POSITIVE
- max-positions (`int`), NOT NULL, POSITIVE
- post-date (`date`), NOT NULL
- deadline (`datetime`), NOT NULL
- skillset (`ref list`), NOT NULL, @language
- type (`string`), NOT NULL, IN [full-time / part-time / work-from-home]
- duration (`int`), NOT NULL, POSITIVE
- salary (`int`), NOT NULL, POSITIVE
- rating (`float`), NOT NULL, POSITIVE

# application
- applicant (`ref`), NOT NULL, @user
- job (`ref`), NOT NULL, @job
- SOP (`text`), NOT NULL, MAX 250 words
- state (`text`), NOT NULL, IN [applied / shortlisted / accepted / rejected]
