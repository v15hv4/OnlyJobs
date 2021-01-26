import "./styles.scss";
import { useContext, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Badge,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";

import { SessionContext } from "App";
import ApplicantService from "api/applicants";
import ApplicationService from "api/applications";

import StarRatingComponent from "react-star-rating-component";

const ApplicationItem = ({
    _id,
    state,
    SOP,
    join_date,
    applied_date,
    job,
    applicant,
    refreshList,
}) => {
    const [application, applicationHandlers] = ApplicationService();

    const stateModifiers = [
        {
            name: "applied",
            callback: () => applicationHandlers.edit(_id, { state: "applied" }),
        },
        {
            name: "shortlisted",
            callback: () => applicationHandlers.edit(_id, { state: "shortlisted" }),
        },
        { name: "accepted", callback: () => null },
        {
            name: "rejected",
            callback: () => applicationHandlers.edit(_id, { state: "rejected" }),
        },
    ];

    const { session } = useContext(SessionContext);
    const [appl, applHandlers] = ApplicantService();
    useEffect(() => applHandlers.view({ _id: applicant._id }), []); // eslint-disable-line

    useEffect(() => console.log(appl.data), [appl.data]);

    return (
        <Card className="d-flex flex-fill p-3">
            {session.user.role === "applicant" && (
                <CardHeader className="d-flex justify-content-between">
                    <div>
                        <div className="h3 font-weight-bold">{job.title}</div>
                        <div className="text-muted h5">
                            Posted on {new Date(job.post_date).toLocaleDateString("en-IN")} by{" "}
                            <span className="fw-700">{job.recruiter.name}</span>
                        </div>
                    </div>
                    <div className="text-dark d-flex align-items-center justify-content-end salary-container">
                        <div className="h3 fw-700 mr-1">
                            ₹{new Intl.NumberFormat("en-IN").format(job.salary)}
                        </div>
                        <div>per month</div>
                    </div>
                </CardHeader>
            )}
            {session.user.role === "recruiter" && (
                <CardHeader className="d-flex justify-content-between">
                    <div>
                        <div className="h3 font-weight-bold">{applicant.name}</div>
                        <div className="text-muted h5">
                            Applied on {new Date(applied_date).toLocaleDateString("en-IN")}
                        </div>
                    </div>
                    <div className="text-dark d-flex align-items-center justify-content-end salary-container">
                        <StarRatingComponent
                            className="d-flex align-items-center mt-2"
                            editing={false}
                            starColor="#ffb400"
                            emptyStarColor="#ffb400"
                            value={appl.data && appl.data[0].rating.value}
                            starCount={5}
                            renderStarIcon={(index, value) => {
                                return (
                                    <span>
                                        <i
                                            className={
                                                index <= value ? "fas fa-star" : "far fa-star"
                                            }
                                        />
                                    </span>
                                );
                            }}
                            renderStarIconHalf={() => {
                                return (
                                    <span>
                                        <span style={{ position: "absolute" }}>
                                            <i className="far fa-star" />
                                        </span>
                                        <span>
                                            <i className="fas fa-star-half" />
                                        </span>
                                    </span>
                                );
                            }}
                        />
                        <div className="ml-1 text-muted">
                            ({appl.data && appl.data[0].rating.amount})
                        </div>
                    </div>
                </CardHeader>
            )}
            {session.user.role === "applicant" && (
                <CardBody>
                    {/* TODO: change to applied_date */}
                    <div className="">
                        You applied to this listing on
                        <span className="fw-700 ml-1">
                            {new Date(applied_date).toLocaleDateString("en-IN")}.
                        </span>
                    </div>
                    <div className="mt-1">
                        Statement of purpose:
                        <div className="border rounded p-2 px-3 mt-2">"{SOP}"</div>
                    </div>
                </CardBody>
            )}
            {session.user.role === "recruiter" && (
                <CardBody>
                    <div className="mt-1">
                        E-Mail Address: <code>{applicant.email}</code>
                    </div>
                    {appl.data && appl.data[0].skills.length ? (
                        <div className="mt-3">
                            Skills:
                            <div className="mt-1">
                                {appl.data[0].skills.map((s) => (
                                    <Badge color="success" className="p-2 mr-2">
                                        {s.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    <div className="mt-3">
                        Statement of purpose:
                        <div className="border rounded p-2 px-3 mt-2">"{SOP}"</div>
                    </div>
                </CardBody>
            )}
            <CardFooter className={`d-flex justify-content-end`}>
                <div
                    className={`text-uppercase d-flex justify-content-center align-items-center fw-700 px-4 py-2 rounded state-${state}`}
                >
                    {state}
                </div>
                {session.user.role === "recruiter" && (
                    <UncontrolledButtonDropdown className="m-0 p-0">
                        <DropdownToggle color="" className="text-uppercase fw-500 ml-2" caret>
                            Change State
                        </DropdownToggle>
                        <DropdownMenu>
                            {stateModifiers.map((s) =>
                                s.name !== state ? (
                                    <DropdownItem
                                        className="text-uppercase fw-500"
                                        onClick={() => {
                                            s.callback();
                                            refreshList();
                                        }}
                                    >
                                        {s.name}
                                    </DropdownItem>
                                ) : null
                            )}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                )}
            </CardFooter>
        </Card>
    );
};

export default ApplicationItem;
