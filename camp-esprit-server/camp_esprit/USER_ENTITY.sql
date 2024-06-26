create table USER_ENTITY
(
    ID                          varchar(36)                  not null
        primary key,
    EMAIL                       varchar(255)                 null,
    EMAIL_CONSTRAINT            varchar(255)                 null,
    EMAIL_VERIFIED              tinyint default 0            not null,
    ENABLED                     tinyint default 0            not null,
    FEDERATION_LINK             varchar(255)                 null,
    FIRST_NAME                  varchar(255) charset utf8mb3 null,
    LAST_NAME                   varchar(255) charset utf8mb3 null,
    REALM_ID                    varchar(255)                 null,
    USERNAME                    varchar(255) charset utf8mb3 null,
    CREATED_TIMESTAMP           bigint                       null,
    SERVICE_ACCOUNT_CLIENT_LINK varchar(255)                 null,
    NOT_BEFORE                  int     default 0            not null,
    constraint UK_DYKN684SL8UP1CRFEI6ECKHD7
        unique (REALM_ID, EMAIL_CONSTRAINT),
    constraint UK_RU8TT6T700S9V50BU18WS5HA6
        unique (REALM_ID, USERNAME)
);

create index IDX_USER_EMAIL
    on USER_ENTITY (EMAIL);

create index IDX_USER_SERVICE_ACCOUNT
    on USER_ENTITY (REALM_ID, SERVICE_ACCOUNT_CLIENT_LINK);

