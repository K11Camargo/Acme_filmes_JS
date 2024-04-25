DROP DATABASE acmefilmes11;
create database acmefilmes11;

use acmefilmes11;

create table tbl_classificacao(
id int not null auto_increment primary key,
faixa_etaria varchar(2) not null,
classificacao varchar(45)not null,
caracteristica varchar(100)not null,
icone varchar(45)not null
);

desc tbl_classificacao;

ALTER TABLE tbl_classificacao MODIFY icone VARCHAR(100) NOT NULL;


insert into tbl_classificacao( faixa_etaria, classificacao, caracteristica, icone) values
(
"L",
"Livre",
"Não expõe crianças a conteúdo potencialmente prejudiciais",
"https://logodownload.org/wp-content/uploads/2017/07/classificacao-livre-logo.png"
);



create table tbl_sexo(
id int not null auto_increment primary key,
sigla varchar(1) not null,
nome varchar(15) not null
);

insert into tbl_sexo(sigla, nome) values("M","masculino");
insert into tbl_sexo(sigla, nome) values("F","feminino");



create table tbl_genero(
id int not null auto_increment primary key,
nome varchar(45) not null
);
insert into tbl_genero(nome) values("terror");

create table tbl_nacionalidade(
id int not null auto_increment primary key,
nome varchar(45)
);


create table tbl_filme(
id int not null auto_increment primary key,
nome varchar(80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float,
disponibilidade boolean,
tbl_classificacao_id int,

constraint FK_CLASSIFICACAO_FILME
foreign key(tbl_classificacao_id)
references tbl_classificacao(id),

unique key(id),
unique index(id)
);

create table tbl_ator(
id int not null auto_increment primary key,
nome varchar(100) not null,
nome_artistico varchar(100),
data_nascimento date not null,
data_falescimento date,
biografia text not null,
foto varchar(150),
id_sexo int,

constraint FK_SEXO_ATOR
foreign key (id_sexo)
references tbl_sexo (id)

);

create table tbl_diretor(
id int not null auto_increment primary key,
nome varchar(100) not null,
data_nascimento date not null,
data_falescimento date,
biografia text not null,
foto varchar(150),
id_sexo int,

constraint FK_SEXO_DIRETOR
foreign key (id_sexo)
references tbl_sexo (id)

);


create table tbl_filme_genero(
id int not null auto_increment primary key,
id_filme int,
id_genero int,

constraint FK_FILME_FILMEGENERO
foreign key (id_filme)
references tbl_filme (id),

constraint FK_GENERO_FILMEGENERO
foreign key (id_genero)
references tbl_genero (id)
);

create table tbl_filme_ator(
id int not null auto_increment primary key,
id_filme int,
id_ator int,

constraint FK_FILME_FILMEATOR
foreign key (id_filme)
references tbl_filme (id),

constraint FK_ATOR_FILMEATOR
foreign key (id_ator)
references tbl_ator (id)
);

create table tbl_ator_nacionalidade(
id int not null auto_increment primary key,
id_ator int,
id_nacionalidade int,

constraint FK_ATOR_ATORNACIONALIDADE
foreign key (id_ator)
references tbl_ator (id),

constraint FK_NACIONALIDADE_ATORNACIONALIDADE
foreign key(id_nacionalidade)
references tbl_nacionalidade (id)
);

create table tbl_diretor_nacionalidade(
id int not null auto_increment primary key,
id_diretor int,
id_nacionalidade int,

constraint FK_DIRETOR_DIRETORNACIONALIDADE
foreign key (id_diretor)
references tbl_diretor (id),

constraint FK_NACIONALIDADE_DIRETORNACIONALIDADE
foreign key(id_nacionalidade)
references tbl_nacionalidade (id)
);


show tables;

desc tbl_filme;
DESCRIBE TBL_FILME;
insert into tbl_filme (  nome,
                                            sinopse,
                                            duracao,
                                            data_lancamento,
                                            data_relancamento,
                                            foto_capa,
                                            valor_unitario,
                                            disponibilidade,
                                            tbl_classificacao_id

            ) values (
                                            'testando a parada',
                                            'testando a api',
                                            '02:00:00',
                                            '2024-01-07',
                                            null,
                                            'https://exemplo.com/foto_tempo.jpg',
                                            '34.99',
                                            true,
                                            '1'

            );
insert into tbl_filme (  nome,
                                            sinopse,
                                            duracao,
                                            data_lancamento,
                                            data_relancamento,
                                            foto_capa,
                                            valor_unitario,
                                            disponibilidade,
                                            classificacao

            ) values (
                                            'testando a parada',
                                            'testando a api',
                                            '02:00:00',
                                            '2024-01-07',
                                            null,
                                            'https://exemplo.com/foto_tempo.jpg',
                                            '34.99',
                                            '1',
                                            'true',
                                            1

            );


insert into tbl_filme(
		nome, 
		sinopse, 
		duracao, 
		data_lancamento,
		data_relancamento, 
		foto_capa, 
		valor_unitario, 
		disponibilidade, 
		tbl_classificacao_id
        )values(
			"JOKER",
			 "Joaquin Phoenix stars as the iconic comic book villain in this original story that earned him his first Oscar® for Best Actor.",
			 "02:02:00",
			 "2019-08-03",
			 null,
			 "https://br.web.img3.acsta.net/c_310_420/pictures/19/04/03/18/23/2539612.jpg",
			 "19.90",
			 true,
			 "1"
);
	
    
insert into tbl_filme (
		nome, 
		sinopse, 
		duracao, 
		data_lancamento,
		data_relancamento, 
		foto_capa, 
		valor_unitario, 
		disponibilidade, 
		tbl_classificacao_id
            ) values(
				'Duna',
				'Inspirado na série de livros de Frank Herbert, Duna se passa em um futuro longínquo. O Duque Leto Atreides administra o planeta desértico Arrakis, também conhecido como Duna, lugar de única fonte da substância rara chamada de "melange", usada para estender a vida humana, chegar a velocidade da luz e garantir poderes sobrehumanos. Para isso ele manda seu filho, Paul Atreides (Timothée Chalamet), um jovem brilhante e talentoso que nasceu para ter um grande destino além de sua imaginação, e seus servos e concubina Lady Jessica (Rebecca Fergunson), que também é uma Bene Gesserit. Eles vão para Duna, afim de garantir o futuro de sua família e seu povo. Porém, uma traição amarga pela posse da melange faz com que Paul e Jessica fujam para os Fremen, nativos do planeta que vivem nos cantos mais longes do deserto.',
				'2:36:00',
				'2021-10-21',
				null,
				'https://br.web.img3.acsta.net/c_310_420/pictures/21/09/29/20/10/5897145.jpg',
				'44.00',
                true,
				1
            );
    
    
 select * from tbl_filme;
 
select * from tbl_filme where nome like 'JOKER';


select id from tbl_filme order by id desc limit 1;
select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;

#last_insert_id()  ---> permite retornar o último ID inserido em uma tabela
#cast() ---> Permite realizar a conversão de tipo de dados durante um select

