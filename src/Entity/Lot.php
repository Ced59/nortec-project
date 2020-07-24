<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\LotRepository")
 */
class Lot
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     */
    private $numeroLot;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $libelleLot;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Report", inversedBy="lots")
     */
    private $report;

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
}
