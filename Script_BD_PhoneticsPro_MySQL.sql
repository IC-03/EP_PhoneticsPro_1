CREATE DATABASE IF NOT EXISTS `phoneticsPro` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `phoneticsPro`;

CREATE TABLE users (
    id_user INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(100) UNIQUE,
    password_user VARCHAR(20) UNIQUE,
    name_user VARCHAR(100)
);

CREATE TABLE attempt(
    id_attempt INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    total_attempt INT,
    correct_attempt INT,
    date_attempt DATE,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE word(
    id_word INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    term VARCHAR(50),
    transcription VARCHAR(50) COLLATE "utf8mb4_bin"
);

INSERT INTO word (term, transcription) VALUES 
('Ball', 'bɔːl'),
('Face', 'feɪs'),
('Land', 'lænd'),
('Style', 'staɪl'),
('Weight', 'weɪt'),
('Time', 'taɪm'),
('Paint', 'peɪnt'),
('Court', 'kɔːt'),
('Heart', 'hɑːt'),
('Hurt', 'hɜːt'),
('Beam', 'biːm'),
('Hold', 'həʊld'),
('Horse', 'hɔːs'),
('Feel', 'fiːl'),
('Leave', 'liːv'),
('Kick', 'kɪk'),
('Life', 'laɪf'),
('Cat', 'kæt'),
('Sun', 'sʌn'),
('Two', 'tuː'),
('White', 'waɪt'),
('Pink', 'pɪŋk'),
('Shy', 'ʃaɪ'),
('Sky', 'skaɪ'),
('Blue', 'bluː'),
('Book', 'bʊk'),
('Bird', 'bɜːd'),
('Fox', 'fɒks'),
('Black', 'blæk'),
('Bee', 'biː'),
('Beach', 'biːtʃ'),
('Fly', 'flaɪ'),
('Light', 'laɪt'),
('ILL', 'ɪl'),
('Feet', 'fiːt'),
('Cry', 'kraɪ'),
('Try', 'traɪ'),
('Dog', 'dɒg'),
('Fish', 'fɪʃ'),
('Height', 'haɪt'),
('Cut', 'kʌt'),
('Like', 'laɪk');

INSERT INTO users (email, password_user, name_user) VALUES 
  ('alice.smith@gmail.com', 'alice123', 'alice'),
  ('bob.jones@outlook.com', 'bob123', 'bob'),
  ('charlie.brown@hotmail.com', 'charlie123', 'charlie'),
  ('david.wilson@gmail.com', 'david123', 'david'),
  ('emma.garcia@yahoo.com', 'emma123', 'emma'),
  ('frank.davis@gmail.com', 'frank123', 'frank'),
  ('grace.miller@outlook.com', 'grace123', 'grace'),
  ('henry.thompson@hotmail.com', 'henry123', 'henry'),
  ('isabella.taylor@gmail.com', 'isabella123', 'isabella'),
  ('jacob.martinez@yahoo.com', 'jacob123', 'jacob'),
  ('kate.jackson@gmail.com', 'kate123', 'kate'),
  ('liam.anderson@outlook.com', 'liam123', 'liam'),
  ('mia.white@hotmail.com', 'mia123', 'mia'),
  ('noah.hernandez@gmail.com', 'noah123', 'noah'),
  ('olivia.robinson@yahoo.com', 'olivia123', 'olivia'),
  ('peter.lewis@outlook.com', 'peter123', 'peter'),
  ('quinn.wang@gmail.com', 'quinn123', 'quinn'),
  ('rachel.nguyen@hotmail.com', 'rachel123', 'rache'),
  ('samuel.kelly@yahoo.com', 'samuel123', 'samuel'),
  ('taylor.gonzalez@gmail.com', 'taylor123', 'taylor'),
  ('victoria.hall@outlook.com', 'victoria123', 'victoria'),
  ('william.lopez@hotmail.com', 'william123', 'william'),
  ('xavier.perez@gmail.com', 'xavier123', 'xavier'),
  ('yasmine.rivera@yahoo.com', 'yasmine123', 'yasmine'),
  ('zoe.chen@gmail.com', 'zoe123', 'zoe'),
  ('adam.wright@outlook.com', 'adam123', 'adam'),
  ('bella.murphy@hotmail.com', 'bella123', 'bella'),
  ('caleb.king@gmail.com', 'caleb123', 'caleb'),
  ('daisy.scott@outlook.com', 'daisy123', 'daisy'),
  ('ethan.hughes@yahoo.com', 'ethan123', 'ethan'),
  ('fiona.ng@gmail.com', 'fiona123', 'fiona'),
  ('george.young@outlook.com', 'george123', 'george'),
  ('hannah.lee@hotmail.com', 'hannah123', 'hannah'),
  ('ian.green@gmail.com', 'ian123', 'ian'),
  ('julia.fernandez@yahoo.com', 'julia123', 'julia'),
  ('kevin.carter@outlook.com', 'kevin123', 'kevin'),
  ('lily.zhang@gmail.com', 'lily123', 'lily'),
  ('max.walker@hotmail.com', 'max123', 'max'),
  ('nora.hill@gmail.com', 'nora123', 'nora'),
  ('owen.nguyen@outlook.com', 'owen123', 'owen'),
  ('pamela.martin@gmail.com', 'pamela123', 'pamela'),
  ('quincy.kim@hotmail.com', 'quincy123', 'quincy'),
  ('riley.baker@gmail.com', 'riley123', 'riley'),
  ('sophia.sanchez@outlook.com', 'sophia123', 'sophia'),
  ('tyler.diaz@yahoo.com', 'tyler123', 'tyler'),
  ('una.patel@gmail.com', 'una123', 'una'),
  ('violet.adams@outlook.com', 'violet123', 'violet'),
  ('willow.hall@hotmail.com', 'willow123', 'willow');
  
INSERT INTO attempt(total_attempt, correct_attempt, date_attempt, id_user) VALUES
(12,9,'2024-03-01',1),
(8,5,'2024-03-03',1),
(15,11,'2024-03-05',1),
(7,4,'2024-03-07',1),
(10,7,'2024-03-09',1),
(8,5,'2024-03-02',2),
(15,11,'2024-03-04',2),
(10,7,'2024-03-06',2),
(9,6,'2024-03-08',2),
(11,8,'2024-03-03',3),
(13,9,'2024-03-05',3),
(16,12,'2024-03-07',3),
(10,7,'2024-03-09',3),
(12,9,'2024-03-11',3),
(18,14,'2024-03-04',4),
(17,13,'2024-03-06',4),
(19,15,'2024-03-05',5),
(21,18,'2024-03-07',5),
(22,19,'2024-03-09',5),
(23,18,'2024-03-11',5);