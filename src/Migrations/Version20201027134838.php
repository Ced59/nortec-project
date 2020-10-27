<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201027134838 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE annuaire (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, telephone VARCHAR(255) DEFAULT NULL, INDEX IDX_456BA70B979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE echeance (id INT AUTO_INCREMENT NOT NULL, lot_id INT NOT NULL, numero_echeance INT NOT NULL, redacteur VARCHAR(255) NOT NULL, sujet VARCHAR(255) NOT NULL, categorie VARCHAR(255) NOT NULL, date_debut DATE DEFAULT NULL, date_fin_prevue DATE DEFAULT NULL, date_cloture DATE DEFAULT NULL, INDEX IDX_40D9893BA8CBA5F7 (lot_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE echeance_report (echeance_id INT NOT NULL, report_id INT NOT NULL, INDEX IDX_B13661AA5B318673 (echeance_id), INDEX IDX_B13661AA4BD2A4C0 (report_id), PRIMARY KEY(echeance_id, report_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE annuaire ADD CONSTRAINT FK_456BA70B979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE echeance ADD CONSTRAINT FK_40D9893BA8CBA5F7 FOREIGN KEY (lot_id) REFERENCES lot (id)');
        $this->addSql('ALTER TABLE echeance_report ADD CONSTRAINT FK_B13661AA5B318673 FOREIGN KEY (echeance_id) REFERENCES echeance (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE echeance_report ADD CONSTRAINT FK_B13661AA4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE effectif ADD echeance_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE effectif ADD CONSTRAINT FK_F0B590F15B318673 FOREIGN KEY (echeance_id) REFERENCES echeance (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F0B590F15B318673 ON effectif (echeance_id)');
        $this->addSql('ALTER TABLE lot ADD annuaire_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B5132B86A FOREIGN KEY (annuaire_id) REFERENCES annuaire (id)');
        $this->addSql('CREATE INDEX IDX_B81291B5132B86A ON lot (annuaire_id)');
        $this->addSql('ALTER TABLE report ADD chrono INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B5132B86A');
        $this->addSql('ALTER TABLE echeance_report DROP FOREIGN KEY FK_B13661AA5B318673');
        $this->addSql('ALTER TABLE effectif DROP FOREIGN KEY FK_F0B590F15B318673');
        $this->addSql('DROP TABLE annuaire');
        $this->addSql('DROP TABLE echeance');
        $this->addSql('DROP TABLE echeance_report');
        $this->addSql('DROP INDEX UNIQ_F0B590F15B318673 ON effectif');
        $this->addSql('ALTER TABLE effectif DROP echeance_id');
        $this->addSql('DROP INDEX IDX_B81291B5132B86A ON lot');
        $this->addSql('ALTER TABLE lot DROP annuaire_id');
        $this->addSql('ALTER TABLE report DROP chrono');
    }
}
