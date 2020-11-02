<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"company"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CompanyRepository")
 */
class Company
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"lot","company"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot", "project","report","company","echeance"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company"})
     */
    private $adresse1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company"})
     */
    private $adresse2;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"lot","company"})
     */
    private $codePostal;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company"})
     */
    private $ville;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company"})
     */
    private $mail1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company"})
     */
    private $mail2;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Project", mappedBy="companies")
     */
    private $projects;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lot", mappedBy="company")
     */
    private $lots;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Annuaire", mappedBy="company")
     * @ApiSubresource
     * @Groups({"lot","company"})
     */
    private $annuaires;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->lots = new ArrayCollection();
        $this->annuaires = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

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
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): self
    {
        $this->codePostal = $codePostal;

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

    public function getMail1(): ?string
    {
        return $this->mail1;
    }

    public function setMail1(string $mail1): self
    {
        $this->mail1 = $mail1;

        return $this;
    }

    public function getMail2(): ?string
    {
        return $this->mail2;
    }

    public function setMail2(string $mail2): self
    {
        $this->mail2 = $mail2;

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->addCompany($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->contains($project)) {
            $this->projects->removeElement($project);
            $project->removeCompany($this);
        }

        return $this;
    }

    /**
     * @return Collection|Lot[]
     */
    public function getLots(): Collection
    {
        return $this->lots;
    }

    public function addLot(Lot $lot): self
    {
        if (!$this->lots->contains($lot)) {
            $this->lots[] = $lot;
            $lot->setCompany($this);
        }

        return $this;
    }

    public function removeLot(Lot $lot): self
    {
        if ($this->lots->contains($lot)) {
            $this->lots->removeElement($lot);
            // set the owning side to null (unless already changed)
            if ($lot->getCompany() === $this) {
                $lot->setCompany(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Annuaire[]
     */
    public function getAnnuaires(): Collection
    {
        return $this->annuaires;
    }

    public function addAnnuaire(Annuaire $annuaire): self
    {
        if (!$this->annuaires->contains($annuaire)) {
            $this->annuaires[] = $annuaire;
            $annuaire->setCompany($this);
        }

        return $this;
    }

    public function removeAnnuaire(Annuaire $annuaire): self
    {
        if ($this->annuaires->contains($annuaire)) {
            $this->annuaires->removeElement($annuaire);
            // set the owning side to null (unless already changed)
            if ($annuaire->getCompany() === $this) {
                $annuaire->setCompany(null);
            }
        }

        return $this;
    }
}
