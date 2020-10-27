<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\AnnuaireRepository")
 */
class Annuaire
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telephone;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="annuaires")
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lot", mappedBy="annuaire")
     */
    private $lot;

    public function __construct()
    {
        $this->lot = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

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
     * @return Collection|Lot[]
     */
    public function getLot(): Collection
    {
        return $this->lot;
    }

    public function addLot(Lot $lot): self
    {
        if (!$this->lot->contains($lot)) {
            $this->lot[] = $lot;
            $lot->setAnnuaire($this);
        }

        return $this;
    }

    public function removeLot(Lot $lot): self
    {
        if ($this->lot->contains($lot)) {
            $this->lot->removeElement($lot);
            // set the owning side to null (unless already changed)
            if ($lot->getAnnuaire() === $this) {
                $lot->setAnnuaire(null);
            }
        }

        return $this;
    }
}
