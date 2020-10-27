<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\EcheanceRepository")
 */
class Echeance
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $numeroEcheance;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $redacteur;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sujet;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categorie;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateFinPrevue;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateCloture;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Lot", inversedBy="echeances")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lot;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Report", inversedBy="echeances")
     */
    private $report;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Effectif", mappedBy="echeance", cascade={"persist", "remove"})
     */
    private $effectif;

    public function __construct()
    {
        $this->report = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumeroEcheance(): ?int
    {
        return $this->numeroEcheance;
    }

    public function setNumeroEcheance(int $numeroEcheance): self
    {
        $this->numeroEcheance = $numeroEcheance;

        return $this;
    }

    public function getRedacteur(): ?string
    {
        return $this->redacteur;
    }

    public function setRedacteur(string $redacteur): self
    {
        $this->redacteur = $redacteur;

        return $this;
    }

    public function getSujet(): ?string
    {
        return $this->sujet;
    }

    public function setSujet(string $sujet): self
    {
        $this->sujet = $sujet;

        return $this;
    }

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(string $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(?\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFinPrevue(): ?\DateTimeInterface
    {
        return $this->dateFinPrevue;
    }

    public function setDateFinPrevue(?\DateTimeInterface $dateFinPrevue): self
    {
        $this->dateFinPrevue = $dateFinPrevue;

        return $this;
    }

    public function getDateCloture(): ?\DateTimeInterface
    {
        return $this->dateCloture;
    }

    public function setDateCloture(?\DateTimeInterface $dateCloture): self
    {
        $this->dateCloture = $dateCloture;

        return $this;
    }

    public function getLot(): ?Lot
    {
        return $this->lot;
    }

    public function setLot(?Lot $lot): self
    {
        $this->lot = $lot;

        return $this;
    }

    /**
     * @return Collection|Report[]
     */
    public function getReport(): Collection
    {
        return $this->report;
    }

    public function addReport(Report $report): self
    {
        if (!$this->report->contains($report)) {
            $this->report[] = $report;
        }

        return $this;
    }

    public function removeReport(Report $report): self
    {
        if ($this->report->contains($report)) {
            $this->report->removeElement($report);
        }

        return $this;
    }

    public function getEffectif(): ?Effectif
    {
        return $this->effectif;
    }

    public function setEffectif(?Effectif $effectif): self
    {
        $this->effectif = $effectif;

        // set (or unset) the owning side of the relation if necessary
        $newEcheance = null === $effectif ? null : $this;
        if ($effectif->getEcheance() !== $newEcheance) {
            $effectif->setEcheance($newEcheance);
        }

        return $this;
    }
}
