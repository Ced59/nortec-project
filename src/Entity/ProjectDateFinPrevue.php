<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProjectDateFinPrevueRepository")
 */
class ProjectDateFinPrevue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"project"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="dateFinPrevues")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Project;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->Project;
    }

    public function setProject(?Project $Project): self
    {
        $this->Project = $Project;

        return $this;
    }
}
