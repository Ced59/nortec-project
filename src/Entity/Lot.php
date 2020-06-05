<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
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
    private $numero_lot;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $libelle_lot;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumeroLot(): ?string
    {
        return $this->numero_lot;
    }

    public function setNumeroLot(string $numero_lot): self
    {
        $this->numero_lot = $numero_lot;

        return $this;
    }

    public function getLibelleLot(): ?string
    {
        return $this->libelle_lot;
    }

    public function setLibelleLot(string $libelle_lot): self
    {
        $this->libelle_lot = $libelle_lot;

        return $this;
    }
}
