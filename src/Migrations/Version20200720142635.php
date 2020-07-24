<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200720142635 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_project (user_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_77BECEE4A76ED395 (user_id), INDEX IDX_77BECEE4166D1F9C (project_id), PRIMARY KEY(user_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE lot ADD report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('CREATE INDEX IDX_B81291B4BD2A4C0 ON lot (report_id)');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE dateFinReelle dateFinReelle DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE propreteIccessImputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE securityConmment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user_project');
        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B4BD2A4C0');
        $this->addSql('DROP INDEX IDX_B81291B4BD2A4C0 ON lot');
        $this->addSql('ALTER TABLE lot DROP report_id');
        $this->addSql('ALTER TABLE photo CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project CHANGE dateFinReelle dateFinReelle DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE propreteIccessImputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE proprete_commune_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE securityConmment_imputation CHANGE report_id report_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
