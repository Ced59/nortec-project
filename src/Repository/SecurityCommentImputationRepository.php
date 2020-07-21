<?php

namespace App\Repository;

use App\Entity\SecurityCommentImputation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method SecurityCommentImputation|null find($id, $lockMode = null, $lockVersion = null)
 * @method SecurityCommentImputation|null findOneBy(array $criteria, array $orderBy = null)
 * @method SecurityCommentImputation[]    findAll()
 * @method SecurityCommentImputation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SecurityCommentImputationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SecurityCommentImputation::class);
    }

    // /**
    //  * @return SecurityCommentImputation[] Returns an array of SecurityCommentImputation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SecurityCommentImputation
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
