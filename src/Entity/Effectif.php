<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\EffectifRepository")
 */
class Effectif
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"echeance"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"echeance"})
     */
    private $effectifPrevu;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"echeance"})
     */
    private $effectifConstate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company")
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Echeance", inversedBy="effectif", cascade={"persist", "remove"})
     */
    private $echeance;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEffectifPrevu(): ?int
    {
        return $this->effectifPrevu;
    }

    public function setEffectifPrevu(int $effectifPrevu): self
    {
        $this->effectifPrevu = $effectifPrevu;

        return $this;
    }

    public function getEffectifConstate(): ?int
    {
        return $this->effectifConstate;
    }

    public function setEffectifConstate(int $effectifConstate): self
    {
        $this->effectifConstate = $effectifConstate;

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

    public function getEcheance(): ?Echeance
    {
        return $this->echeance;
    }

    public function setEcheance(?Echeance $echeance): self
    {
        $this->echeance = $echeance;

        return $this;
    }
}
