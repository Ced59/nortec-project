<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
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
    private $effectif_prevu;

    /**
     * @ORM\Column(type="integer")
     */
    private $effectif_constate;

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
        return $this->effectif_prevu;
    }

    public function setEffectifPrevu(int $effectif_prevu): self
    {
        $this->effectif_prevu = $effectif_prevu;

        return $this;
    }

    public function getEffectifConstate(): ?int
    {
        return $this->effectif_constate;
    }

    public function setEffectifConstate(int $effectif_constate): self
    {
        $this->effectif_constate = $effectif_constate;

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
