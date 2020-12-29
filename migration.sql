create database TEST_AUTH_JWT;

use TEST_AUTH_JWT;

create table CAD_USUARIO
(
    ID_USUARIO            bigint auto_increment,
    NO_USUARIO            varchar(100)                                                not null,
    CD_EMAIL              varchar(100)                                                not null unique,
    CD_SENHA              varchar(200)                                                not null,
    EN_SITUACAO           set ('ATIVO', 'INATIVO', 'BLOQUEADO', 'BANIDO', 'EXCLUIDO') not null default 'INATIVO',
    EN_TIPO               set ('ADMIN', 'USER', 'TESTER')                             not null default 'USER',
    DH_CADASTRO           datetime                                                             default now(),
    DH_ULTIMA_ATUALIZACAO datetime                                                             default now(),
    primary key (ID_USUARIO)
);

create table CAD_DISPOSITIVO
(
    ID_DISPOSITIVO        bigint auto_increment,
    ID_USUARIO            bigint       null,
    NO_DISPOSITIVO        varchar(255) not null,
    EN_SITUACAO           set ('ATIVO', 'INATIVO', 'BLOQUEADO', 'BANIDO', 'EXCLUIDO') not null default 'INATIVO',
    DH_CADASTRO           datetime     not null default now(),
    DH_ULTIMA_ATUALIZACAO datetime     not null default now(),
    primary key (ID_DISPOSITIVO),
    constraint FK_USUARIO_DISPOSITIVO
        foreign key (ID_USUARIO) references CAD_USUARIO (ID_USUARIO)
);

insert into CAD_USUARIO (NO_USUARIO, CD_EMAIL, CD_SENHA, EN_SITUACAO, EN_TIPO, DH_CADASTRO, DH_ULTIMA_ATUALIZACAO)
values ('Bruno Trócolis',
        'bruno@trocolis.com',
        '1f7b2b6dafd12f1c06419ff6c7468df41aec331409154b2bececf7361fefb0786f638d2380be9919620576ddd76ebb94d8e9bd62141d5b8ab2e1ddd7825445ef',
        'ATIVO',
        'TESTER',
        now(),
        now());

commit;
