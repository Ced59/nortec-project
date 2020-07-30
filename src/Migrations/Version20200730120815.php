<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200730120815 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE project_company (project_id INT NOT NULL, company_id INT NOT NULL, INDEX IDX_D9A1052A166D1F9C (project_id), INDEX IDX_D9A1052A979B1AD6 (company_id), PRIMARY KEY(project_id, company_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE project_company ADD CONSTRAINT FK_D9A1052A166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_company ADD CONSTRAINT FK_D9A1052A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE lot ADD project_id INT DEFAULT NULL, ADD date_debut_echeance DATE NOT NULL, ADD date_fin_echeance DATE NOT NULL, CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('CREATE INDEX IDX_B81291B166D1F9C ON lot (project_id)');
        $this->addSql('ALTER TABLE media_object CHANGE file_path file_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE code_postal code_postal VARCHAR(8) NOT NULL, CHANGE date_fin_reelle date_fin_reelle DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_access_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE security_comment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE project_company');
        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B166D1F9C');
        $this->addSql('DROP INDEX IDX_B81291B166D1F9C ON lot');
        $this->addSql('ALTER TABLE lot DROP project_id, DROP date_debut_echeance, DROP date_fin_echeance, CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE media_object CHANGE file_path file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE code_postal code_postal VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE date_fin_reelle date_fin_reelle DATE NOT NULL');
        $this->addSql('ALTER TABLE proprete_access_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE security_comment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
