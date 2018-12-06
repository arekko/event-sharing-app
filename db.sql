-- User table

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

-- Event table

create table event
(
  eId                varchar(128)                            not null,
  title              text                                    null,
  description        text                                    null,
  country            text                                    null,
  city               text                                    null,
  local_address      text                                    null,
  contacts           text                                    null,
  created_date       timestamp default CURRENT_TIMESTAMP     not null,
  event_date         timestamp default '0000-00-00 00:00:00' not null,
  creater_id         text                                    null,
  photo_card_url     text                                    null,
  photo_original_url text                                    null,
  constraint event_eId_uindex
    unique (eId)
);

alter table event
  add primary key (eId);



-- Comment table

create table comment
(
  cId      varchar(128)                        not null,
  text     text                                null,
  date     timestamp default CURRENT_TIMESTAMP null,
  user_id  varchar(128)                        null,
  event_id varchar(128)                        null,
  constraint comment_cId_uindex
    unique (cId),
  constraint event_id
    foreign key (event_id) references event (eId),
  constraint user_id
    foreign key (user_id) references user (uId)
);

alter table comment
  add primary key (cId);
