
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

const isValidObjectId = (id: string): boolean => {
    return /^[a-fA-F0-9]{24}$/.test(id);
};

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || !isValidObjectId(listingId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    if (!favoriteIds.includes(listingId)) {
        favoriteIds.push(listingId);
    }

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    
    if (!listingId || !isValidObjectId(listingId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}