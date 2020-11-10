<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"report"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ReportRepository")
 */
class Report
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"report"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="reports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"report"})
     */
    private $Project;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"report"})
     */
    private $redacteur;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"report"})
     */
    private $dateRedaction;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"report"})
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"report"})
     */
    private $propreteAccessConformity;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $propreteAccessComment;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $propreteAccessCommentIntern;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"report"})
     */
    private $propreteCommuneConformity;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $propreteCommuneComment;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $propreteCommuneCommentIntern;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"report"})
     */
    private $securityConformity;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $securityConmment;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $securityConmmentIntern;

    /**
     * @ORM\Column(type="text")
     * @Groups({"report"})
     */
    private $installations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PropreteAccessImputation", mappedBy="report", orphanRemoval=true)
     * @Groups({"report"})
     */
    private $propreteAccessImputation;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PropreteCommuneImputation", mappedBy="report")
     * @Groups({"report"})
     */
    private $propreteCommuneImputations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SecurityCommentImputation", mappedBy="report")
     * @Groups({"report"})
     */
    private $securityCommentImputations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Photo", mappedBy="Report")
     * @Groups({"report"})
     */
    private $photos;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lot", mappedBy="report")
     * @Groups({"lot","report"})
     */
    private $lots;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"lot","report"})
     */
    private $chrono;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Echeance", mappedBy="report")
     */
    private $echeances;

    public function __construct()
    {
        $this->propreteAccessImputation = new ArrayCollection();
        $this->propreteCommuneImputations = new ArrayCollection();
        $this->securityCommentImputations = new ArrayCollection();
        $this->photos = new ArrayCollection();
        $this->lots = new ArrayCollection();
        $this->echeances = new ArrayCollection();
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

    public function getSecurityConmment(): ?string
    {
        return $this->securityConmment;
    }

    public function setSecurityConmment(string $securityConmment): self
    {
        $this->securityConmment = $securityConmment;

        return $this;
    }

    public function getSecurityConmmentIntern(): ?string
    {
        return $this->securityConmmentIntern;
    }

    public function setSecurityConmmentIntern(string $securityConmmentIntern): self
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
        return $this->propreteAccessImputation;
    }

    public function addPropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if (!$this->propreteAccessImputation->contains($propreteAccessImputation)) {
            $this->propreteAccessImputation[] = $propreteAccessImputation;
            $propreteAccessImputation->setReport($this);
        }

        return $this;
    }

    public function removePropreteAccessImputation(PropreteAccessImputation $propreteAccessImputation): self
    {
        if ($this->propreteAccessImputation->contains($propreteAccessImputation)) {
            $this->propreteAccessImputation->removeElement($propreteAccessImputation);
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

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    /**
     * @return Collection|Echeance[]
     */
    public function getEcheances(): Collection
    {
        return $this->echeances;
    }

    public function addEcheance(Echeance $echeance): self
    {
        if (!$this->echeances->contains($echeance)) {
            $this->echeances[] = $echeance;
            $echeance->addReport($this);
        }

        return $this;
    }

    public function removeEcheance(Echeance $echeance): self
    {
        if ($this->echeances->contains($echeance)) {
            $this->echeances->removeElement($echeance);
            $echeance->removeReport($this);
        }

        return $this;
    }
}
