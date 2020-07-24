<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

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
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $effectifPrevu;

    /**
     * @ORM\Column(type="integer")
     */
    private $effectifConstate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company")
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;

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
}
