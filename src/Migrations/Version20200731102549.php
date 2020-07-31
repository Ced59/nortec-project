<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200731102549 extends AbstractMigration
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
        $this->addSql('CREATE TABLE lot (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, project_id INT DEFAULT NULL, numero_lot VARCHAR(500) NOT NULL, libelle_lot VARCHAR(255) NOT NULL, date_debut_echeance DATE NOT NULL, date_fin_echeance DATE NOT NULL, INDEX IDX_B81291B4BD2A4C0 (report_id), INDEX IDX_B81291B166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE photo (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, link VARCHAR(255) NOT NULL, type VARCHAR(20) NOT NULL, INDEX IDX_14B784184BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, photo VARCHAR(255) NOT NULL, adresse1 VARCHAR(255) NOT NULL, adresse2 VARCHAR(255) NOT NULL, code_postal VARCHAR(8) NOT NULL, date_debut DATE NOT NULL, date_fin_reelle DATE DEFAULT NULL, nom_moex VARCHAR(255) NOT NULL, nom_opc VARCHAR(255) NOT NULL, contact_client VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_company (project_id INT NOT NULL, company_id INT NOT NULL, INDEX IDX_D9A1052A166D1F9C (project_id), INDEX IDX_D9A1052A979B1AD6 (company_id), PRIMARY KEY(project_id, company_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_date_fin_prevue (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, date DATE NOT NULL, INDEX IDX_9069C1E6166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprete_access_imputation (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, report_id INT DEFAULT NULL, pourcent INT NOT NULL, UNIQUE INDEX UNIQ_60D54374979B1AD6 (company_id), INDEX IDX_60D543744BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprete_commune_imputation (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, company_id INT NOT NULL, commentaire LONGTEXT NOT NULL, percent INT NOT NULL, INDEX IDX_9BE261854BD2A4C0 (report_id), UNIQUE INDEX UNIQ_9BE26185979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE report (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, redacteur VARCHAR(255) NOT NULL, date_redaction DATETIME NOT NULL, status VARCHAR(20) NOT NULL, proprete_access_conformity VARCHAR(20) NOT NULL, proprete_access_comment LONGTEXT NOT NULL, proprete_access_comment_intern LONGTEXT NOT NULL, proprete_commune_conformity TINYINT(1) NOT NULL, proprete_commune_comment LONGTEXT NOT NULL, proprete_commune_comment_intern LONGTEXT NOT NULL, security_conformity TINYINT(1) NOT NULL, security_conmment LONGTEXT NOT NULL, security_conmment_intern LONGTEXT NOT NULL, installations LONGTEXT NOT NULL, INDEX IDX_C42F7784166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE security_comment_imputation (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, company_id INT NOT NULL, commentaire LONGTEXT NOT NULL, INDEX IDX_426FF01D4BD2A4C0 (report_id), UNIQUE INDEX UNIQ_426FF01D979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, active TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_project (user_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_77BECEE4A76ED395 (user_id), INDEX IDX_77BECEE4166D1F9C (project_id), PRIMARY KEY(user_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE effectif ADD CONSTRAINT FK_F0B590F1979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B784184BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE project_company ADD CONSTRAINT FK_D9A1052A166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_company ADD CONSTRAINT FK_D9A1052A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_date_fin_prevue ADD CONSTRAINT FK_9069C1E6166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE proprete_access_imputation ADD CONSTRAINT FK_60D54374979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE proprete_access_imputation ADD CONSTRAINT FK_60D543744BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE proprete_commune_imputation ADD CONSTRAINT FK_9BE261854BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE proprete_commune_imputation ADD CONSTRAINT FK_9BE26185979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE security_comment_imputation ADD CONSTRAINT FK_426FF01D4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE security_comment_imputation ADD CONSTRAINT FK_426FF01D979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE effectif DROP FOREIGN KEY FK_F0B590F1979B1AD6');
        $this->addSql('ALTER TABLE project_company DROP FOREIGN KEY FK_D9A1052A979B1AD6');
        $this->addSql('ALTER TABLE proprete_access_imputation DROP FOREIGN KEY FK_60D54374979B1AD6');
        $this->addSql('ALTER TABLE proprete_commune_imputation DROP FOREIGN KEY FK_9BE26185979B1AD6');
        $this->addSql('ALTER TABLE security_comment_imputation DROP FOREIGN KEY FK_426FF01D979B1AD6');
        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B166D1F9C');
        $this->addSql('ALTER TABLE project_company DROP FOREIGN KEY FK_D9A1052A166D1F9C');
        $this->addSql('ALTER TABLE project_date_fin_prevue DROP FOREIGN KEY FK_9069C1E6166D1F9C');
        $this->addSql('ALTER TABLE report DROP FOREIGN KEY FK_C42F7784166D1F9C');
        $this->addSql('ALTER TABLE user_project DROP FOREIGN KEY FK_77BECEE4166D1F9C');
        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B4BD2A4C0');
        $this->addSql('ALTER TABLE photo DROP FOREIGN KEY FK_14B784184BD2A4C0');
        $this->addSql('ALTER TABLE proprete_access_imputation DROP FOREIGN KEY FK_60D543744BD2A4C0');
        $this->addSql('ALTER TABLE proprete_commune_imputation DROP FOREIGN KEY FK_9BE261854BD2A4C0');
        $this->addSql('ALTER TABLE security_comment_imputation DROP FOREIGN KEY FK_426FF01D4BD2A4C0');
        $this->addSql('ALTER TABLE user_project DROP FOREIGN KEY FK_77BECEE4A76ED395');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE effectif');
        $this->addSql('DROP TABLE lot');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE photo');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE project_company');
        $this->addSql('DROP TABLE project_date_fin_prevue');
        $this->addSql('DROP TABLE proprete_access_imputation');
        $this->addSql('DROP TABLE proprete_commune_imputation');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE security_comment_imputation');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_project');
    }
}
