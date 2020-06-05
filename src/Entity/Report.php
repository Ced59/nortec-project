<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
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
    private $proprete_access_conformity;

    /**
     * @ORM\Column(type="text")
     */
    private $proprete_access_comment;

    /**
     * @ORM\Column(type="text")
     */
    private $proprete_access_comment_intern;

    /**
     * @ORM\Column(type="boolean")
     */
    private $proprete_commune_conformity;

    /**
     * @ORM\Column(type="text")
     */
    private $proprete_commune_comment;

    /**
     * @ORM\Column(type="text")
     */
    private $proprete_commune_comment_intern;

    /**
     * @ORM\Column(type="boolean")
     */
    private $security_conformity;

    /**
     * @ORM\Column(type="text")
     */
    private $security_comment;

    /**
     * @ORM\Column(type="text")
     */
    private $security_comment_intern;

    /**
     * @ORM\Column(type="text")
     */
    private $installations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PropreteAccessImputation", mappedBy="report", orphanRemoval=true)
     */
    private $proprete_access_imputation;

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
        $this->proprete_access_imputation = new ArrayCollection();
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
        return $this->proprete_access_conformity;
    }

    public function setPropreteAccessConformity(string $proprete_access_conformity): self
    {
        $this->proprete_access_conformity = $proprete_access_conformity;

        return $this;
    }

    public function getPropreteAccessComment(): ?string
    {
        return $this->proprete_access_comment;
    }

    public function setPropreteAccessComment(string $proprete_access_comment): self
    {
        $this->proprete_access_comment = $proprete_access_comment;

        return $this;
    }

    public function getPropreteAccessCommentIntern(): ?string
    {
        return $this->proprete_access_comment_intern;
    }

    public function setPropreteAccessCommentIntern(string $proprete_access_comment_intern): self
    {
        $this->proprete_access_comment_intern = $proprete_access_comment_intern;

        return $this;
    }

    public function getPropreteCommuneConformity(): ?bool
    {
        return $this->proprete_commune_conformity;
    }

    public function setPropreteCommuneConformity(bool $proprete_commune_conformity): self
    {
        $this->proprete_commune_conformity = $proprete_commune_conformity;

        return $this;
    }

    public function getPropreteCommuneComment(): ?string
    {
        return $this->proprete_commune_comment;
    }

    public function setPropreteCommuneComment(string $proprete_commune_comment): self
    {
        $this->proprete_commune_comment = $proprete_commune_comment;

        return $this;
    }

    public function getPropreteCommuneCommentIntern(): ?string
    {
        return $this->proprete_commune_comment_intern;
    }

    public function setPropreteCommuneCommentIntern(string $proprete_commune_comment_intern): self
    {
        $this->proprete_commune_comment_intern = $proprete_commune_comment_intern;

        return $this;
    }

    public function getSecurityConformity(): ?bool
    {
        return $this->security_conformity;
    }

    public function setSecurityConformity(bool $security_conformity): self
    {
        $this->security_conformity = $security_conformity;

        return $this;
    }

    public function getSecurityComment(): ?string
    {
        return $this->security_comment;
    }

    public function setSecurityComment(string $security_comment): self
    {
        $this->security_comment = $security_comment;

        return $this;
    }

    public function getSecurityCommentIntern(): ?string
    {
        return $this->security_comment_intern;
    }

    public function setSecurityCommentIntern(string $security_comment_intern): self
    {
        $this->security_comment_intern = $security_comment_intern;

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
        return $this->proprete_access_imputation;
    }

    public function addPropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if (!$this->proprete_access_imputation->contains($propreteAccessImputation)) {
            $this->proprete_access_imputation[] = $propreteAccessImputation;
            $propreteAccessImputation->setReport($this);
        }

        return $this;
    }

    public function removePropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if ($this->proprete_access_imputation->contains($propreteAccessImputation)) {
            $this->proprete_access_imputation->removeElement($propreteAccessImputation);
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
