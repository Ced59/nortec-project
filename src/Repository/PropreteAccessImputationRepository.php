<?php

namespace App\Repository;

use App\Entity\PropreteAccessImputation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method PropreteAccessImputation|null find($id, $lockMode = null, $lockVersion = null)
 * @method PropreteAccessImputation|null findOneBy(array $criteria, array $orderBy = null)
 * @method PropreteAccessImputation[]    findAll()
 * @method PropreteAccessImputation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PropreteAccessImputationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PropreteAccessImputation::class);
    }

    // /**
    //  * @return PropreteAccessImputation[] Returns an array of PropreteAccessImputation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PropreteAccessImputation
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
