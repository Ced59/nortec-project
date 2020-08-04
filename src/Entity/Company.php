<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\CompanyRepository")
 */
class Company
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"lot"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot", "project"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot"})
     */
    private $adresse1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot"})
     */
    private $adresse2;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"lot"})
     */
    private $codePostal;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot"})
     */
    private $ville;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot"})
     */
    private $mail1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot"})
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

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->lots = new ArrayCollection();
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
}
