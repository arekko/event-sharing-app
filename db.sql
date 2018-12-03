create table user
(
  uId                varchar(128)                        not null,
  username           text                                not null,
  email              text                                not null,
  password           text                                not null,
  firstname          text                                not null,
  lastname           text                                not null,
  city               text                                null,
  sex                text                                null,
  age                int                                 null,
  country            text                                null,
  bio                text                                null,
  confirmed          tinyint(1) default '0'              null,
  isAdmin            tinyint(1) default '0'              not null,
  photo_url_original text                                null,
  photo_url_thumb    text                                null,
  register_date      timestamp default CURRENT_TIMESTAMP null,
  last_login_date    timestamp default CURRENT_TIMESTAMP null,
  last_logout_date   timestamp default CURRENT_TIMESTAMP null,
  constraint table_name_uId_uindex
  unique (uId)
);

alter table user
  add primary key (uId);

create table appdb.event
(
  eId          varchar(128)                          not null,
  title        text                                  null,
  description  text                                  null,
  address      text                                  null,
  created_date timestamp default current_timestamp() not null,
  event_date   text                                  not null,
  creater_id   text                                  null,
  location     text                                  null,
  constraint event_eId_uindex
  unique (eId)
);

alter table appdb.event
  add primary key (eId);
