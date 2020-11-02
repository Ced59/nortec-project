<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

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
     * @Groups({"lot","company", "project"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"lot","company", "project"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"lot","company", "project"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"lot","company", "project"})
     */
    private $telephone;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="annuaires")
     * @Groups({"lot","project"})
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
