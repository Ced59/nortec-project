<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201109090745 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE echeance ADD effectif_prevu VARCHAR(255) DEFAULT NULL, ADD effectif_constate VARCHAR(255) DEFAULT NULL, DROP categorie');
        $this->addSql('ALTER TABLE lot DROP FOREIGN KEY FK_B81291B5132B86A');
        $this->addSql('DROP INDEX IDX_B81291B5132B86A ON lot');
        $this->addSql('ALTER TABLE lot DROP annuaire_id, DROP date_debut_echeance, DROP date_fin_echeance');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE echeance ADD categorie VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP effectif_prevu, DROP effectif_constate');
        $this->addSql('ALTER TABLE lot ADD annuaire_id INT DEFAULT NULL, ADD date_debut_echeance DATE NOT NULL, ADD date_fin_echeance DATE NOT NULL');
        $this->addSql('ALTER TABLE lot ADD CONSTRAINT FK_B81291B5132B86A FOREIGN KEY (annuaire_id) REFERENCES annuaire (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B81291B5132B86A ON lot (annuaire_id)');
    }
}
