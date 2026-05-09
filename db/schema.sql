DROP DATABASE IF EXISTS SportsManagement;
CREATE DATABASE SportsManagement;
USE SportsManagement;


CREATE TABLE MembershipType (
    MembershipTypeId    INT             NOT NULL AUTO_INCREMENT,
    MembershipTypeName  VARCHAR(50)     NOT NULL UNIQUE,          -- e.g. Gold, Silver, Bronze
    Duration            INT             NOT NULL DEFAULT 12        -- duration in months
        CHECK (Duration > 0),
    MonthlyCost         DECIMAL(8,2)    NOT NULL DEFAULT 0.00
        CHECK (MonthlyCost >= 0),
    Benefits            TEXT,
    PRIMARY KEY (MembershipTypeId)
);


CREATE TABLE DifficultyLevel (
    DifficultyLevelId   INT             NOT NULL AUTO_INCREMENT,
    LevelName           VARCHAR(50)     NOT NULL UNIQUE,          -- e.g. Beginner, Intermediate, Advanced
    LevelDescription    TEXT,
    PRIMARY KEY (DifficultyLevelId)
);

CREATE TABLE Specialization (
    SpecializationId    INT             NOT NULL AUTO_INCREMENT,
    SpecializationName  VARCHAR(100)    NOT NULL UNIQUE,          -- e.g. Yoga, Swimming, Boxing
    SpecDescription     TEXT,
    PRIMARY KEY (SpecializationId)
);

CREATE TABLE FacilityType (
    FacilityTypeId      INT             NOT NULL AUTO_INCREMENT,
    FacilityTypeName    VARCHAR(50)     NOT NULL UNIQUE,          -- e.g. Pool, Gym, Court
    TypeDescription     TEXT,
    PRIMARY KEY (FacilityTypeId)
);


CREATE TABLE Address (
    AddressId           INT             NOT NULL AUTO_INCREMENT,
    Building            VARCHAR(100),
    StreetNo            VARCHAR(20),
    City                VARCHAR(50)     NOT NULL,
    PRIMARY KEY (AddressId)
);

CREATE TABLE Members (
    MemberId            INT             NOT NULL AUTO_INCREMENT,
    MemberFirstName     VARCHAR(50)     NOT NULL,
    MemberLastName      VARCHAR(50)     NOT NULL,
    MemberDateOfBirth   DATE,
    MemberEmail         VARCHAR(100)    NOT NULL UNIQUE,
    MemberPhoneNumber   VARCHAR(20),
    AddressId           INT,
    MembershipTypeId    INT,
    MemberStatus        VARCHAR(20)     NOT NULL DEFAULT 'Active'
        CHECK (MemberStatus IN ('Active', 'Inactive', 'Suspended')),
    MemberStartDate     DATE            NOT NULL,
    MemberEndDate       DATE,
    PRIMARY KEY (MemberId),
    FOREIGN KEY (AddressId)        REFERENCES Address(AddressId)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (MembershipTypeId) REFERENCES MembershipType(MembershipTypeId)
        ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE Trainer (
    TrainerId           INT             NOT NULL AUTO_INCREMENT,
    TrainerFirstName    VARCHAR(50)     NOT NULL,
    TrainerLastName     VARCHAR(50)     NOT NULL,
    TrainerEmail        VARCHAR(100)    NOT NULL UNIQUE,
    TrainerPhoneNumber  VARCHAR(20),
    TrainerHireDate     DATE            NOT NULL,
    SpecializationId    INT,
    TrainerStatus       VARCHAR(20)     NOT NULL DEFAULT 'Active'
        CHECK (TrainerStatus IN ('Active', 'Inactive')),
    PRIMARY KEY (TrainerId),
    FOREIGN KEY (SpecializationId) REFERENCES Specialization(SpecializationId)
        ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE SportsActivity (
    ActivityId          INT             NOT NULL AUTO_INCREMENT,
    ActivityName        VARCHAR(100)    NOT NULL UNIQUE,
    DifficultyLevelId   INT,
    MaxCapacity         INT             NOT NULL DEFAULT 20
        CHECK (MaxCapacity > 0),
    ActivityFee         DECIMAL(8,2)    NOT NULL DEFAULT 0.00
        CHECK (ActivityFee >= 0),
    ActivityDescription TEXT,
    ActivityStatus      VARCHAR(20)     NOT NULL DEFAULT 'Active'
        CHECK (ActivityStatus IN ('Active', 'Inactive')),
    PRIMARY KEY (ActivityId),
    FOREIGN KEY (DifficultyLevelId) REFERENCES DifficultyLevel(DifficultyLevelId)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Facilities (
    FacilityId          INT             NOT NULL AUTO_INCREMENT,
    FacilityName        VARCHAR(100)    NOT NULL UNIQUE,
    FacilityTypeId      INT,
    FacilityLocation    VARCHAR(150),
    FacilityCapacity    INT             NOT NULL DEFAULT 1
        CHECK (FacilityCapacity > 0),
    FacilityStatus      VARCHAR(20)     NOT NULL DEFAULT 'Available'
        CHECK (FacilityStatus IN ('Available', 'Under Maintenance', 'Closed')),
    PRIMARY KEY (FacilityId),
    FOREIGN KEY (FacilityTypeId) REFERENCES FacilityType(FacilityTypeId)
        ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE Schedule (
    ScheduleId          INT             NOT NULL AUTO_INCREMENT,
    ActivityId          INT             NOT NULL,
    FacilityId          INT             NOT NULL,
    TrainerId           INT,
    ScheduleStartDate   DATE            NOT NULL,
    ScheduleEndDate     DATE            NOT NULL,
    ScheduleStartTime   TIME            NOT NULL DEFAULT '08:00:00',
    ScheduleEndTime     TIME            NOT NULL DEFAULT '09:00:00',
    ScheduleDayOfWeek   VARCHAR(15)     NOT NULL
        CHECK (ScheduleDayOfWeek IN ('Monday','Tuesday','Wednesday',
                                      'Thursday','Friday','Saturday','Sunday')),
    PRIMARY KEY (ScheduleId),
    FOREIGN KEY (ActivityId) REFERENCES SportsActivity(ActivityId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (FacilityId) REFERENCES Facilities(FacilityId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (TrainerId)  REFERENCES Trainer(TrainerId)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Reservation (
    ReservationId           INT             NOT NULL AUTO_INCREMENT,
    MemberId                INT             NOT NULL,
    FacilityId              INT             NOT NULL,
    ReservationDate         DATE            NOT NULL,
    ReservationStartTime    TIME            NOT NULL,
    ReservationEndTime      TIME            NOT NULL,
    ReservationStatus       VARCHAR(20)     NOT NULL DEFAULT 'Pending'
        CHECK (ReservationStatus IN ('Pending','Confirmed','Cancelled','Completed')),
    PRIMARY KEY (ReservationId),
    FOREIGN KEY (MemberId)   REFERENCES Members(MemberId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (FacilityId) REFERENCES Facilities(FacilityId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Participation (
    ParticipationId     INT             NOT NULL AUTO_INCREMENT,
    MemberId            INT             NOT NULL,
    ActivityId          INT             NOT NULL,
    ParticipationStatus VARCHAR(20)     NOT NULL DEFAULT 'Enrolled'
        CHECK (ParticipationStatus IN ('Enrolled','Completed','Dropped','Waitlisted')),
    EnrollmentDate      DATE            NOT NULL,
    PRIMARY KEY (ParticipationId),
    UNIQUE KEY uq_member_activity (MemberId, ActivityId),   -- prevent duplicate enrollments
    FOREIGN KEY (MemberId)   REFERENCES Members(MemberId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ActivityId) REFERENCES SportsActivity(ActivityId)
        ON DELETE CASCADE ON UPDATE CASCADE
);
