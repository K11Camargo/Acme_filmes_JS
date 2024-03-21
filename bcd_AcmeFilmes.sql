create database db_acme_filmes_turma_ba;

use db_acme_filmes_turma_ba;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(211) not null,
    valor_unitario float, 
    
    unique key (id),
    unique index(id)
);

insert into tbl_filme (nome, sinopse,duracao, data_lancamento, foto_capa, valor_unitario) values
("Carros", 
"Relâmpago McQueen (Owen Wilson) é um carro de corridas ambicioso, que já em sua 1ª temporada na Copa Pistão torna-se um astro. Ele sonha em se tornar o 1º estreante a vencer o campeonato, o que possibilitaria que assinasse um patrocínio com a cobiçada Dinoco. A fama faz com que Relâmpago acredite que não precisa da ajuda de ninguém, sendo uma equipe de um carro só. Esta arrogância lhe custa caro na última corrida da temporada, fazendo com que seus dois pneus traseiros estourem na última volta da corrida. O problema permite que seus dois principais adversários, o ídolo Rei (Richard Petty) e o traiçoeiro Chicks (Michael Keaton), cruzem a linha de chegada juntamente com ele, o que faz com que uma corrida de desempate seja agendada na California. Relâmpago é então levado para o local de corrida por Mack (John Ratzenberger), um caminhão que faz parte de sua equipe. Ele quer chegar ao local antes de seus competidores e, por causa disto, insiste que Mack viage sem interrupções. Mack termina dormindo em pleno trânsito, o que faz com que a caçamba se abra e Relâmpago, que também estava dormindo, seja largado em plena estrada. Ao acordar Relâmpago tenta encontrar Mack a todo custo, mas não tem sucesso. Em seu desespero ele chega à pequena Radiator Springs, uma cidade do interior que tem pouquíssimo movimento e que jamais ouviu falar de Relâmpago ou até mesmo da Copa Pistão. Porém, por ter destruído a principal rua da cidade, Relâmpago é condenado a reasfaltá-la. Obrigado a permanecer na cidade contra a sua vontade, aos poucos ele conhece os habitantes locais e começa a se afeiçoar por eles.",
"01:36:00",
"2006-07-30",
"https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/77/81/19961449.jpg",
"17.00"
);

insert into tbl_filme(nome, sinopse,duracao, data_lancamento, foto_capa, valor_unitario) values
("Clube da Luta",
"Jack (Edward Norton) é um executivo jovem, trabalha como investigador de seguros, mora confortavelmente, mas ele está ficando cada vez mais insatisfeito com sua vida medíocre. Para piorar ele está enfrentando uma terrível crise de insônia, até que encontra uma cura inusitada para o sua falta de sono ao frequentar grupos de auto-ajuda. Nesses encontros ele passa a conviver com pessoas problemáticas como a viciada Marla Singer (Helena Bonham Carter) e a conhecer estranhos como Tyler Durden (Brad Pitt). Misterioso e cheio de ideias, Tyler apresenta para Jack um grupo secreto que se encontra para extravasar suas angústias e tensões através de violentos combates corporais.",
"02:19:00",
"1999-10-29",
"https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/95/96/20122166.jpg",
"30.00"
);

insert into tbl_filme(nome, sinopse,duracao, data_lancamento, foto_capa, valor_unitario) values
("Interestelar",
"Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), Jenkins (Marlon Sanders) e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph (Mackenzie Foy e Jessica Chastain) investirá numa própria jornada para também tentar salvar a população do planeta.",
"02:49:00",
"2014-11-06",
"https://br.web.img3.acsta.net/c_310_420/pictures/14/10/31/20/39/476171.jpg",
"20.00"
);


