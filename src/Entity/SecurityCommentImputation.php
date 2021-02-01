<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\SecurityCommentImputationRepository")
 */
class SecurityCommentImputation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"report"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\REport", inversedBy="securityCommentImputations")
     */
    private $report;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="securityCommentImputations")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"report"})
     */
    private $company;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $commentaire;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReport(): ?REport
    {
        return $this->report;
    }

    public function setReport(?REport $report): self
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
}
