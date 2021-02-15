<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 *@ApiResource(
 *     normalizationContext={"groups"={"lot"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\LotRepository")
 */
class Lot
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"lot", "project","report","echeance"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     * @Groups({"lot", "project","report","echeance"})
     */
    private $numeroLot;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot", "project","report","echeance"})
     */
    private $libelleLot;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Report", inversedBy="lots")
     */
    private $report;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="lots")
     */
    private $project;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="lots")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"lot", "project","report","echeance"})
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Echeance", mappedBy="lot")
     * @Groups({"lot", "project","report"})
     */
    private $echeances;

    public function __construct()
    {
        $this->echeances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumeroLot(): ?string
    {
        return $this->numeroLot;
    }

    public function setNumeroLot(string $numeroLot): self
    {
        $this->numeroLot = $numeroLot;

        return $this;
    }

    public function getLibelleLot(): ?string
    {
        return $this->libelleLot;
    }

    public function setLibelleLot(string $libelleLot): self
    {
        $this->libelleLot = $libelleLot;

        return $this;
    }

    public function getReport(): ?Report
    {
        return $this->report;
    }

    public function setReport(?Report $report): self
    {
        $this->report = $report;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Echeance[]
     */
    public function getEcheances(): Collection
    {
        return $this->echeances;
    }

    public function addEcheance(Echeance $echeance): self
    {
        if (!$this->echeances->contains($echeance)) {
            $this->echeances[] = $echeance;
            $echeance->setLot($this);
        }

        return $this;
    }

    public function removeEcheance(Echeance $echeance): self
    {
        if ($this->echeances->contains($echeance)) {
            $this->echeances->removeElement($echeance);
            // set the owning side to null (unless already changed)
            if ($echeance->getLot() === $this) {
                $echeance->setLot(null);
            }
        }

        return $this;
    }
}
