import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ArticleSeeder = async () => {

    await prisma.article.upsert({

        where: { id: 1 },

        update: {
            title: 'Articulos de muestra',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 1  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            isPublished: false,
            authorId: 1,
        },

        create: {
            title: 'Articulos de muestra',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 1  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            isPublished: false,
            authorId: 1,
        },

    });

    await prisma.article.upsert({

        where: { id: 2 },

        update: {
            title: "Articulo 2",
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 1  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 2  ',
            isPublished: true,
            authorId: 2,
        },

        create: {
            title: "Articulo 2",
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 1  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 2  ',
            isPublished: true,
            authorId: 2,
        },

    });

}