<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TeamMemberRequest;
use App\Models\TeamMember;
use App\Support\ContentMedia;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TeamMembers/Index', [
            'teamMembers' => TeamMember::query()
                ->ordered()
                ->get()
                ->map(fn (TeamMember $teamMember) => [
                    'id' => $teamMember->id,
                    'name' => $teamMember->name,
                    'role' => $teamMember->localized('role'),
                    'is_published' => $teamMember->is_published,
                    'sort_order' => $teamMember->sort_order,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/TeamMembers/Form', [
            'teamMember' => null,
            'nextSortOrder' => (int) TeamMember::max('sort_order') + 1,
        ]);
    }

    public function store(TeamMemberRequest $request): RedirectResponse
    {
        TeamMember::create($request->teamMemberAttributes());

        return to_route('admin.team-members.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, TeamMember $teamMember): Response
    {
        return Inertia::render('Admin/TeamMembers/Form', [
            'teamMember' => [
                ...$teamMember->only([
                    'id', 'name', 'role', 'focus', 'photo',
                    'x_url', 'instagram_url', 'linkedin_url', 'website_url',
                    'sort_order', 'is_published',
                ]),
                'photo_url' => ContentMedia::url($teamMember->photo),
            ],
        ]);
    }

    public function update(TeamMemberRequest $request, string $locale, TeamMember $teamMember): RedirectResponse
    {
        $previousPhoto = $teamMember->photo;

        $teamMember->update($request->teamMemberAttributes());

        if ($previousPhoto !== $teamMember->photo) {
            ContentMedia::delete($previousPhoto);
        }

        return to_route('admin.team-members.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        ContentMedia::delete($teamMember->photo);

        return to_route('admin.team-members.index')->with('status', __('admin.flash.deleted'));
    }
}
