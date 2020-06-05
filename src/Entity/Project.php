<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $adresse1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $adresse2;

    /**
     * @ORM\Column(type="string", length=8)
     */
    private $code_postal;

    /**
     * @ORM\Column(type="date")
     */
    private $date_debut;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $date_fin_reelle;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom_MOEX;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom_OPC;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $contact_client;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ville;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectDateFinPrevue", mappedBy="Project", orphanRemoval=true)
     */
    private $date_fin_prevues;

    public function __construct()
    {
        $this->date_fin_prevues = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getAdresse1(): ?string
    {
        return $this->adresse1;
    }

    public function setAdresse1(string $adresse1): self
    {
        $this->adresse1 = $adresse1;

        return $this;
    }

    public function getAdresse2(): ?string
    {
        return $this->adresse2;
    }

    public function setAdresse2(string $adresse2): self
    {
        $this->adresse2 = $adresse2;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->code_postal;
    }

    public function setCodePostal(string $code_postal): self
    {
        $this->code_postal = $code_postal;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->date_debut;
    }

    public function setDateDebut(\DateTimeInterface $date_debut): self
    {
        $this->date_debut = $date_debut;

        return $this;
    }

    public function getDateFinReelle(): ?\DateTimeInterface
    {
        return $this->date_fin_reelle;
    }

    public function setDateFinReelle(?\DateTimeInterface $date_fin_reelle): self
    {
        $this->date_fin_reelle = $date_fin_reelle;

        return $this;
    }

    public function getNomMOEX(): ?string
    {
        return $this->nom_MOEX;
    }

    public function setNomMOEX(string $nom_MOEX): self
    {
        $this->nom_MOEX = $nom_MOEX;

        return $this;
    }

    public function getNomOPC(): ?string
    {
        return $this->nom_OPC;
    }

    public function setNomOPC(string $nom_OPC): self
    {
        $this->nom_OPC = $nom_OPC;

        return $this;
    }

    public function getContactClient(): ?string
    {
        return $this->contact_client;
    }

    public function setContactClient(string $contact_client): self
    {
        $this->contact_client = $contact_client;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    /**
     * @return Collection|ProjectDateFinPrevue[]
     */
    public function getDateFinPrevues(): Collection
    {
        return $this->date_fin_prevues;
    }

    public function addDateFinPrevue(ProjectDateFinPrevue $dateFinPrevue): self
    {
        if (!$this->date_fin_prevues->contains($dateFinPrevue)) {
            $this->date_fin_prevues[] = $dateFinPrevue;
            $dateFinPrevue->setProject($this);
        }

        return $this;
    }

    public function removeDateFinPrevue(ProjectDateFinPrevue $dateFinPrevue): self
    {
        if ($this->date_fin_prevues->contains($dateFinPrevue)) {
            $this->date_fin_prevues->removeElement($dateFinPrevue);
            // set the owning side to null (unless already changed)
            if ($dateFinPrevue->getProject() === $this) {
                $dateFinPrevue->setProject(null);
            }
        }

        return $this;
    }
}
