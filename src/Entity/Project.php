<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"project:output"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project:output"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"project:output"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $photo;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $adresse1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $adresse2;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"project:output"})
     */
    private $code_postal;

    /**
     * @ORM\Column(type="date")
     * @Groups({"project:output"})
     */
    private $date_debut;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"project:output"})
     */
    private $date_fin_reelle;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $nom_MOEX;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $nom_OPC;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $contact_client;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:output"})
     */
    private $ville;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectDateFinPrevue", mappedBy="Project", orphanRemoval=true)
     */
    private $date_fin_prevues;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Report", mappedBy="Project", orphanRemoval=true)
     */
    private $reports;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="project")
     * @Groups({"project:output"})
     */
    private $users;


    public function __construct()
    {
        $this->date_fin_prevues = new ArrayCollection();
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
