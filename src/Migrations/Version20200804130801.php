<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200804130801 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lot ADD company_id INT NOT NULL, CHANGE report_id report_id INT DEFAULT NULL, CHANGE project_id project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_B81291B979B1AD6 ON lot (company_id)');
        $this->addSql('ALTER TABLE media_object CHANGE file_path file_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE date_fin_reelle date_fin_reelle DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_access_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE security_comment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B979B1AD6');
        $this->addSql('DROP INDEX IDX_B81291B979B1AD6 ON lot');
        $this->addSql('ALTER TABLE lot DROP company_id, CHANGE report_id report_id INT DEFAULT NULL, CHANGE project_id project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE media_object CHANGE file_path file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE date_fin_reelle date_fin_reelle DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE proprete_access_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE security_comment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
