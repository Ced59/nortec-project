<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PropreteAccessImputationRepository")
 */
class PropreteAccessImputation
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
    private $pourcent;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Company", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Report", inversedBy="proprete_access_imputation")
     * @ORM\JoinColumn(nullable=true)
     */
    private $report;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPourcent(): ?int
    {
        return $this->pourcent;
    }

    public function setPourcent(int $pourcent): self
    {
        $this->pourcent = $pourcent;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(Company $company): self
    {
        $this->company = $company;

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

}
