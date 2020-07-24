<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"project"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Le nom du projet est obligatoire !")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"project"})
     * @Assert\NotBlank(message="La descrpition du projet est obligatoire !")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="L'adresse du projet est obligatoire !")
     */
    private $adresse1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     */
    private $adresse2;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Le code postal est obligatoire !")
     */
    private $codePostal;

    /**
     * @ORM\Column(type="date")
     * @Groups({"project"})
     * @Assert\NotBlank(message="Veuillez renseignez une date de démarrage du projet !")
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"project"})
     */
    private $dateFinReelle;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Le nom du MOEX est obligatoire !")
     */
    private $nomMOEX;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Le nom de l'OPC est obligatoire !")
     */
    private $nomOPC;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Veuillez renseigner un moyen de contacter le client !")
     */
    private $contactClient;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project"})
     * @Assert\NotBlank(message="Le nom da la ville est obligatoire !")
     */
    private $ville;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectDateFinPrevue", mappedBy="Project", orphanRemoval=true)
     */
    private $dateFinPrevues;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Report", mappedBy="Project", orphanRemoval=true)
     */
    private $reports;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="project")
     * @Groups({"project"})
     */
    private $users;


    public function __construct()
    {
        $this->dateFinPrevues = new ArrayCollection();
        $this->reports = new ArrayCollection();
        $this->users = new ArrayCollection();
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
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFinReelle(): ?\DateTimeInterface
    {
        return $this->dateFinReelle;
    }

    public function setDateFinReelle(?\DateTimeInterface $dateFinReelle): self
    {
        $this->dateFinReelle = $dateFinReelle;

        return $this;
    }

    public function getNomMOEX(): ?string
    {
        return $this->nomMOEX;
    }

    public function setNomMOEX(string $nomMOEX): self
    {
        $this->nomMOEX = $nomMOEX;

        return $this;
    }

    public function getNomOPC(): ?string
    {
        return $this->nomOPC;
    }

    public function setNomOPC(string $nomOPC): self
    {
        $this->nomOPC = $nomOPC;

        return $this;
    }

    public function getContactClient(): ?string
    {
        return $this->contactClient;
    }

    public function setContactClient(string $contactClient): self
    {
        $this->contactClient = $contactClient;

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
        return $this->dateFinPrevues;
    }

    public function addDateFinPrevue(ProjectDateFinPrevue $dateFinPrevue): self
    {
        if (!$this->dateFinPrevues->contains($dateFinPrevue)) {
            $this->dateFinPrevues[] = $dateFinPrevue;
            $dateFinPrevue->setProject($this);
        }

        return $this;
    }

    public function removeDateFinPrevue(ProjectDateFinPrevue $dateFinPrevue): self
    {
        if ($this->dateFinPrevues->contains($dateFinPrevue)) {
            $this->dateFinPrevues->removeElement($dateFinPrevue);
            // set the owning side to null (unless already changed)
            if ($dateFinPrevue->getProject() === $this) {
                $dateFinPrevue->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Report[]
     */
    public function getReports(): Collection
    {
        return $this->reports;
    }

    public function addReport(Report $report): self
    {
        if (!$this->reports->contains($report)) {
            $this->reports[] = $report;
            $report->setProject($this);
        }

        return $this;
    }

    public function removeReport(Report $report): self
    {
        if ($this->reports->contains($report)) {
            $this->reports->removeElement($report);
            // set the owning side to null (unless already changed)
            if ($report->getProject() === $this) {
                $report->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addProject($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeProject($this);
        }

        return $this;
    }

}
