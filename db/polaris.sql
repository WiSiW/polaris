/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/7/19 23:34:39                           */
/*==============================================================*/


drop table if exists p_account;

/*==============================================================*/
/* Table: p_account                                             */
/*==============================================================*/
create table p_account
(
   account_id           int not null comment '账号id',
   user_name            varchar(200) comment '姓名',
   password             varchar(50),
   nick_name            varchar(200) comment '昵称',
   sex                  int comment '性别
            1：女
            2：男',
   email                varchar(200) comment '邮箱',
   head_img             varchar(200) comment '头像',
   account_phone        varchar(200) comment '手机',
   create_time          datetime,
   update_time          datetime,
   creater              int,
   source               varchar(100) comment '账号来源',
   is_disable           int comment '是否禁用',
   is_delete            int,
   primary key (account_id)
);

alter table p_account comment '账号';

