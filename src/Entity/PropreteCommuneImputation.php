<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PropreteCommuneImputationRepository")
 */
class PropreteCommuneImputation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"report"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Report", inversedBy="propreteCommuneImputations")
     */
    private $report;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="propreteCommuneImputations")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"report"})
     */
    private $company;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $commentaire;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"report"})
     */
    private $percent;


    public function getId(): ?int
    {
        return $this->id;
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

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getPercent(): ?int
    {
        return $this->percent;
    }

    public function setPercent(int $percent): self
    {
        $this->percent = $percent;

        return $this;
    }

}
