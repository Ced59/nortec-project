<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200605155239 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, adresse1 VARCHAR(255) NOT NULL, adresse2 VARCHAR(255) NOT NULL, code_postal VARCHAR(8) NOT NULL, ville VARCHAR(255) NOT NULL, mail1 VARCHAR(255) NOT NULL, mail2 VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE effectif (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, effectif_prevu INT NOT NULL, effectif_constate INT NOT NULL, INDEX IDX_F0B590F1979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lot (id INT AUTO_INCREMENT NOT NULL, numero_lot VARCHAR(500) NOT NULL, libelle_lot VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE photo (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, link VARCHAR(255) NOT NULL, type VARCHAR(20) NOT NULL, INDEX IDX_14B784184BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprete_access_imputation (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, report_id INT DEFAULT NULL, pourcent INT NOT NULL, UNIQUE INDEX UNIQ_60D54374979B1AD6 (company_id), INDEX IDX_60D543744BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprete_commune_imputation (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, company_id INT NOT NULL, commentaire LONGTEXT NOT NULL, percent INT NOT NULL, INDEX IDX_9BE261854BD2A4C0 (report_id), UNIQUE INDEX UNIQ_9BE26185979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE report (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, redacteur VARCHAR(255) NOT NULL, date_redaction DATETIME NOT NULL, status VARCHAR(20) NOT NULL, proprete_access_conformity VARCHAR(20) NOT NULL, proprete_access_comment LONGTEXT NOT NULL, proprete_access_comment_intern LONGTEXT NOT NULL, proprete_commune_conformity TINYINT(1) NOT NULL, proprete_commune_comment LONGTEXT NOT NULL, proprete_commune_comment_intern LONGTEXT NOT NULL, security_conformity TINYINT(1) NOT NULL, security_comment LONGTEXT NOT NULL, security_comment_intern LONGTEXT NOT NULL, installations LONGTEXT NOT NULL, INDEX IDX_C42F7784166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE security_comment_imputation (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, company_id INT NOT NULL, commentaire LONGTEXT NOT NULL, INDEX IDX_426FF01D4BD2A4C0 (report_id), UNIQUE INDEX UNIQ_426FF01D979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE effectif ADD CONSTRAINT FK_F0B590F1979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B784184BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE proprete_access_imputation ADD CONSTRAINT FK_60D54374979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE proprete_access_imputation ADD CONSTRAINT FK_60D543744BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE proprete_commune_imputation ADD CONSTRAINT FK_9BE261854BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE proprete_commune_imputation ADD CONSTRAINT FK_9BE26185979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE security_comment_imputation ADD CONSTRAINT FK_426FF01D4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE security_comment_imputation ADD CONSTRAINT FK_426FF01D979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE effectif DROP FOREIGN KEY FK_F0B590F1979B1AD6');
        $this->addSql('ALTER TABLE proprete_access_imputation DROP FOREIGN KEY FK_60D54374979B1AD6');
        $this->addSql('ALTER TABLE proprete_commune_imputation DROP FOREIGN KEY FK_9BE26185979B1AD6');
        $this->addSql('ALTER TABLE security_comment_imputation DROP FOREIGN KEY FK_426FF01D979B1AD6');
        $this->addSql('ALTER TABLE photo DROP FOREIGN KEY FK_14B784184BD2A4C0');
        $this->addSql('ALTER TABLE proprete_access_imputation DROP FOREIGN KEY FK_60D543744BD2A4C0');
        $this->addSql('ALTER TABLE proprete_commune_imputation DROP FOREIGN KEY FK_9BE261854BD2A4C0');
        $this->addSql('ALTER TABLE security_comment_imputation DROP FOREIGN KEY FK_426FF01D4BD2A4C0');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE effectif');
        $this->addSql('DROP TABLE lot');
        $this->addSql('DROP TABLE photo');
        $this->addSql('DROP TABLE proprete_access_imputation');
        $this->addSql('DROP TABLE proprete_commune_imputation');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE security_comment_imputation');
    }
}
