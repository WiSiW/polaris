/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/8/7 10:11:15                            */
/*==============================================================*/


drop table if exists article_list;

drop table if exists user_list;

/*==============================================================*/
/* Table: article_list                                          */
/*==============================================================*/
create table article_list
(
   article_id           int(11) not null auto_increment,
   user_id              int(20),
   a_title              varchar(255) character set utf8,
   a_content            text character set utf8,
   a_create_time        datetime default NULL,
   a_type               int(11) default NULL,
   a_head_img           varchar(255) character set utf8,
   a_introduce          varchar(255) default NULL,
   primary key (article_id)
)
ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

alter table article_list comment 'article_list';

/*==============================================================*/
/* Table: user_list                                             */
/*==============================================================*/
create table user_list
(
   user_id              int(20) not null auto_increment,
   password             varchar(255) character set utf8,
   user_name            varchar(255) character set utf8,
   u_head_img           varchar(255) character set utf8,
   u_create_time        date default NULL,
   token                text character set utf8,
   primary key (user_id)
)
ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

alter table user_list comment 'user_list';

alter table article_list add constraint FK_Reference_1 foreign key (user_id)
      references user_list (user_id) on delete restrict on update restrict;

