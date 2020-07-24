<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ReportRepository")
 */
class Report
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Project;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $redacteur;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateRedaction;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $propreteAccessConformity;

    /**
     * @ORM\Column(type="text")
     */
    private $propreteAccessComment;

    /**
     * @ORM\Column(type="text")
     */
    private $propreteAccessCommentIntern;

    /**
     * @ORM\Column(type="boolean")
     */
    private $propreteCommuneConformity;

    /**
     * @ORM\Column(type="text")
     */
    private $propreteCommuneComment;

    /**
     * @ORM\Column(type="text")
     */
    private $propreteCommuneCommentIntern;

    /**
     * @ORM\Column(type="boolean")
     */
    private $securityConformity;

    /**
     * @ORM\Column(type="text")
     */
    private $securityConmment;

    /**
     * @ORM\Column(type="text")
     */
    private $securityConmmentIntern;

    /**
     * @ORM\Column(type="text")
     */
    private $installations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PropreteAccessImputation", mappedBy="report", orphanRemoval=true)
     */
    private $propreteIccessImputation;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PropreteCommuneImputation", mappedBy="report")
     */
    private $propreteCommuneImputations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SecurityCommentImputation", mappedBy="report")
     */
    private $securityCommentImputations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Photo", mappedBy="Report")
     */
    private $photos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lot", mappedBy="report")
     */
    private $lots;

    public function __construct()
    {
        $this->propreteIccessImputation = new ArrayCollection();
        $this->propreteCommuneImputations = new ArrayCollection();
        $this->securityCommentImputations = new ArrayCollection();
        $this->photos = new ArrayCollection();
        $this->lots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getRedacteur(): ?string
    {
        return $this->redacteur;
    }

    public function setRedacteur(string $redacteur): self
    {
        $this->redacteur = $redacteur;

        return $this;
    }

    public function getDateRedaction(): ?\DateTimeInterface
    {
        return $this->dateRedaction;
    }

    public function setDateRedaction(\DateTimeInterface $dateRedaction): self
    {
        $this->dateRedaction = $dateRedaction;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPropreteAccessConformity(): ?string
    {
        return $this->propreteAccessConformity;
    }

    public function setPropreteAccessConformity(string $propreteAccessConformity): self
    {
        $this->propreteAccessConformity = $propreteAccessConformity;

        return $this;
    }

    public function getPropreteAccessComment(): ?string
    {
        return $this->propreteAccessComment;
    }

    public function setPropreteAccessComment(string $propreteAccessComment): self
    {
        $this->propreteAccessComment = $propreteAccessComment;

        return $this;
    }

    public function getPropreteAccessCommentIntern(): ?string
    {
        return $this->propreteAccessCommentIntern;
    }

    public function setPropreteAccessCommentIntern(string $propreteAccessCommentIntern): self
    {
        $this->propreteAccessCommentIntern = $propreteAccessCommentIntern;

        return $this;
    }

    public function getPropreteCommuneConformity(): ?bool
    {
        return $this->propreteCommuneConformity;
    }

    public function setPropreteCommuneConformity(bool $propreteCommuneConformity): self
    {
        $this->propreteCommuneConformity = $propreteCommuneConformity;

        return $this;
    }

    public function getPropreteCommuneComment(): ?string
    {
        return $this->propreteCommuneComment;
    }

    public function setPropreteCommuneComment(string $propreteCommuneComment): self
    {
        $this->propreteCommuneComment = $propreteCommuneComment;

        return $this;
    }

    public function getPropreteCommuneCommentIntern(): ?string
    {
        return $this->propreteCommuneCommentIntern;
    }

    public function setPropreteCommuneCommentIntern(string $propreteCommuneCommentIntern): self
    {
        $this->propreteCommuneCommentIntern = $propreteCommuneCommentIntern;

        return $this;
    }

    public function getSecurityConformity(): ?bool
    {
        return $this->securityConformity;
    }

    public function setSecurityConformity(bool $securityConformity): self
    {
        $this->securityConformity = $securityConformity;

        return $this;
    }

    public function getSecurityComment(): ?string
    {
        return $this->securityConmment;
    }

    public function setSecurityComment(string $securityConmment): self
    {
        $this->securityConmment = $securityConmment;

        return $this;
    }

    public function getSecurityCommentIntern(): ?string
    {
        return $this->securityConmmentIntern;
    }

    public function setSecurityCommentIntern(string $securityConmmentIntern): self
    {
        $this->securityConmmentIntern = $securityConmmentIntern;

        return $this;
    }

    public function getInstallations(): ?string
    {
        return $this->installations;
    }

    public function setInstallations(string $installations): self
    {
        $this->installations = $installations;

        return $this;
    }

    /**
     * @return Collection|PropreteAccessImputation[]
     */
    public function getPropreteAccessImputation(): Collection
    {
        return $this->propreteIccessImputation;
    }

    public function addPropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if (!$this->propreteIccessImputation->contains($propreteAccessImputation)) {
            $this->propreteIccessImputation[] = $propreteAccessImputation;
            $propreteAccessImputation->setReport($this);
        }

        return $this;
    }

    public function removePropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if ($this->propreteIccessImputation->contains($propreteAccessImputation)) {
            $this->propreteIccessImputation->removeElement($propreteAccessImputation);
            // set the owning side to null (unless already changed)
            if ($propreteAccessImputation->getReport() === $this) {
                $propreteAccessImputation->setReport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|PropreteCommuneImputation[]
     */
    public function getPropreteCommuneImputations(): Collection
    {
        return $this->propreteCommuneImputations;
    }

    public function addPropreteCommuneImputation(PropreteCommuneImputation $propreteCommuneImputation): self
    {
        if (!$this->propreteCommuneImputations->contains($propreteCommuneImputation)) {
            $this->propreteCommuneImputations[] = $propreteCommuneImputation;
            $propreteCommuneImputation->setReport($this);
        }

        return $this;
    }

    public function removePropreteCommuneImputation(PropreteCommuneImputation $propreteCommuneImputation): self
    {
        if ($this->propreteCommuneImputations->contains($propreteCommuneImputation)) {
            $this->propreteCommuneImputations->removeElement($propreteCommuneImputation);
            // set the owning side to null (unless already changed)
            if ($propreteCommuneImputation->getReport() === $this) {
                $propreteCommuneImputation->setReport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|SecurityCommentImputation[]
     */
    public function getSecurityCommentImputations(): Collection
    {
        return $this->securityCommentImputations;
    }

    public function addSecurityCommentImputation(SecurityCommentImputation $securityCommentImputation): self
    {
        if (!$this->securityCommentImputations->contains($securityCommentImputation)) {
            $this->securityCommentImputations[] = $securityCommentImputation;
            $securityCommentImputation->setReport($this);
        }

        return $this;
    }

    public function removeSecurityCommentImputation(SecurityCommentImputation $securityCommentImputation): self
    {
        if ($this->securityCommentImputations->contains($securityCommentImputation)) {
            $this->securityCommentImputations->removeElement($securityCommentImputation);
            // set the owning side to null (unless already changed)
            if ($securityCommentImputation->getReport() === $this) {
                $securityCommentImputation->setReport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Photo[]
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }

    public function addPhoto(Photo $photo): self
    {
        if (!$this->photos->contains($photo)) {
            $this->photos[] = $photo;
            $photo->setReport($this);
        }

        return $this;
    }

    public function removePhoto(Photo $photo): self
    {
        if ($this->photos->contains($photo)) {
            $this->photos->removeElement($photo);
            // set the owning side to null (unless already changed)
            if ($photo->getReport() === $this) {
                $photo->setReport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Lot[]
     */
    public function getLots(): Collection
    {
        return $this->lots;
    }

    public function addLot(Lot $lot): self
    {
        if (!$this->lots->contains($lot)) {
            $this->lots[] = $lot;
            $lot->setReport($this);
        }

        return $this;
    }

    public function removeLot(Lot $lot): self
    {
        if ($this->lots->contains($lot)) {
            $this->lots->removeElement($lot);
            // set the owning side to null (unless already changed)
            if ($lot->getReport() === $this) {
                $lot->setReport(null);
            }
        }

        return $this;
    }
}
